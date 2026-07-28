#!/usr/bin/env node
/**
 * generate-features.js
 *
 * Scans a Playwright test directory for *.spec.ts files, extracts:
 *   - test.describe() titles + tags
 *   - test.beforeEach() step text (used as a "Background")
 *   - test() titles, tags, and any annotation metadata (TMS/BUG/Severity)
 *     resolved from `testAnnotation(...)` variables
 *   - test.step() / allure.step() text, in source order (including nesting)
 *
 * ...and writes one human-readable ".feature" file per spec file, mirroring
 * the input folder structure under the output directory.
 *
 * This does NOT produce Cucumber-executable Gherkin. It's a readable,
 * traceable summary of what each test does, generated straight from the
 * real test code so it can never drift out of sync.
 *
 * Usage:
 *   node generate-features.js [testsDir] [outDir]
 *
 * Defaults:
 *   testsDir = ./tests
 *   outDir   = ./features
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const TESTS_DIR = path.resolve(process.argv[2] || './tests');
const OUT_DIR = path.resolve(process.argv[3] || './features');
const SPEC_PATTERN = /\.spec\.ts$/;

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function findSpecFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findSpecFiles(full));
    } else if (entry.isFile() && SPEC_PATTERN.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// AST helpers
// ---------------------------------------------------------------------------

// Flattens `a.b.c(...)` callee chains into ['a', 'b', 'c']
function calleeChain(expr) {
  if (ts.isIdentifier(expr)) return [expr.text];
  if (ts.isPropertyAccessExpression(expr)) {
    return [...calleeChain(expr.expression), expr.name.text];
  }
  return [];
}

// Gets readable text out of a string literal / template literal node,
// stripping the surrounding quotes/backticks but leaving ${expr} as-is.
function literalText(node, sourceFile) {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    // Keep the raw source (with ${...}) but drop the outer backticks
    const raw = node.getText(sourceFile);
    return raw.slice(1, -1);
  }
  return null;
}

// Finds a function-like (arrow/function expression) argument in a call's args
function findCallback(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    const a = args[i];
    if (ts.isArrowFunction(a) || ts.isFunctionExpression(a)) return a;
  }
  return null;
}

// Finds an object literal argument in a call's args (used for {tag, annotation})
function findOptionsObject(args) {
  return args.find((a) => ts.isObjectLiteralExpression(a)) || null;
}

function getObjectProperty(obj, name) {
  if (!obj) return null;
  const prop = obj.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name && p.name.getText() === name
  );
  return prop ? prop.initializer : null;
}

function extractTags(optionsObj, sourceFile) {
  const tagNode = getObjectProperty(optionsObj, 'tag');
  if (!tagNode) return [];
  if (ts.isArrayLiteralExpression(tagNode)) {
    return tagNode.elements
      .map((el) => literalText(el, sourceFile))
      .filter(Boolean);
  }
  const single = literalText(tagNode, sourceFile);
  return single ? [single] : [];
}

// ---------------------------------------------------------------------------
// Annotation resolution: const annotationX = testAnnotation('TMS','BUG','SEV')
// ---------------------------------------------------------------------------

// arg is either a single string/template literal, or an array literal of them
// (used for the "bug" annotation param, which may be one bug or several).
function literalOrArray(node, sourceFile) {
  if (!node) return null;
  if (ts.isArrayLiteralExpression(node)) {
    const vals = node.elements
      .map((el) => literalText(el, sourceFile))
      .filter(Boolean);
    return vals.length ? vals : null;
  }
  return literalText(node, sourceFile);
}

function collectAnnotationVars(sourceFile) {
  const map = {};
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isCallExpression(node.initializer)
    ) {
      const chain = calleeChain(node.initializer.expression);
      if (chain.join('.') === 'testAnnotation') {
        const [tmsArg, bugArg, severityArg] = node.initializer.arguments;
        map[node.name.getText()] = {
          tms: literalText(tmsArg, sourceFile) || null,
          bug: literalOrArray(bugArg, sourceFile), // string | string[] | null
          severity: literalText(severityArg, sourceFile) || null,
        };
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return map;
}

function resolveAnnotation(optionsObj, annotationVars) {
  const node = getObjectProperty(optionsObj, 'annotation');
  if (!node) return null;
  if (ts.isIdentifier(node)) {
    return annotationVars[node.text] || null;
  }
  if (ts.isArrayLiteralExpression(node)) {
    const resolved = node.elements
      .map((el) => (ts.isIdentifier(el) ? annotationVars[el.text] : null))
      .filter(Boolean);
    return resolved.length ? resolved : null;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Step extraction: test.step(...) / allure.step(...) in source order, nested
// ---------------------------------------------------------------------------

function extractSteps(node, sourceFile, depth = 0, acc = []) {
  function visit(n) {
    if (ts.isCallExpression(n)) {
      const chain = calleeChain(n.expression);
      const last = chain[chain.length - 1];
      const base = chain[0];
      if (last === 'step' && (base === 'test' || base === 'allure')) {
        const text = literalText(n.arguments[0], sourceFile);
        if (text) {
          acc.push({ text: text.trim(), depth });
        }
        const cb = findCallback(n.arguments);
        if (cb && cb.body) {
          extractSteps(cb.body, sourceFile, depth + 1, acc);
        }
        return; // don't re-descend into this call's args generically
      }
    }
    ts.forEachChild(n, visit);
  }
  visit(node);
  return acc;
}

// ---------------------------------------------------------------------------
// Main structural walk: describe -> beforeEach / test
// ---------------------------------------------------------------------------

function parseSpecFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  const annotationVars = collectAnnotationVars(sourceFile);
  const features = [];

  function visitTop(node) {
    if (ts.isCallExpression(node)) {
      const chain = calleeChain(node.expression);
      if (chain[0] === 'test' && chain[1] === 'describe') {
        features.push(parseDescribe(node, sourceFile, annotationVars));
        return; // don't descend further looking for nested describes here;
        // parseDescribe already walks its own body for tests/beforeEach.
      }
    }
    ts.forEachChild(node, visitTop);
  }
  visitTop(sourceFile);

  return features;
}

function parseDescribe(node, sourceFile, annotationVars) {
  const args = node.arguments;
  const title = literalText(args[0], sourceFile) || '(untitled describe)';
  const optionsObj = findOptionsObject(args);
  const tags = extractTags(optionsObj, sourceFile);
  const cb = findCallback(args);

  const background = [];
  let backgroundLabel = null;
  const tests = [];

  if (cb && cb.body) {
    function visitBody(n) {
      if (ts.isCallExpression(n)) {
        const chain = calleeChain(n.expression);

        // test.beforeEach(['name'], fn) -> Background (name becomes the
        // Background's title, e.g. "Background: Navigate to Playwright Homepage")
        if (chain[0] === 'test' && chain[1] === 'beforeEach') {
          const nameArg = n.arguments.find(
            (a) => ts.isStringLiteral(a) || ts.isTemplateExpression(a)
          );
          const label = nameArg ? literalText(nameArg, sourceFile) : null;
          const beforeCb = findCallback(n.arguments);
          if (label) backgroundLabel = label.trim();
          if (beforeCb && beforeCb.body) {
            background.push(...extractSteps(beforeCb.body, sourceFile, 0));
          }
          return;
        }

        // plain test(name, [options], fn)
        if (chain.length === 1 && chain[0] === 'test') {
          const name = literalText(n.arguments[0], sourceFile) || '(untitled test)';
          const testOptions = findOptionsObject(n.arguments);
          const testTags = extractTags(testOptions, sourceFile);
          const annotation = resolveAnnotation(testOptions, annotationVars);
          const testCb = findCallback(n.arguments);
          const steps = testCb && testCb.body
            ? extractSteps(testCb.body, sourceFile, 0)
            : [];
          tests.push({
            name: name.trim(),
            tags: testTags,
            annotation,
            steps,
          });
          return;
        }
      }
      ts.forEachChild(n, visitBody);
    }
    visitBody(cb.body);
  }

  return { title, tags, background, backgroundLabel, tests };
}

// ---------------------------------------------------------------------------
// Gherkin-ish keyword inference (purely cosmetic; original text is preserved)
// ---------------------------------------------------------------------------

const KEYWORD_RE = /^(given|when|then|and|but)\b[:,\-]?\s*/i;

function withKeywords(steps) {
  let firstSeen = false;
  return steps.map((step) => {
    const match = step.text.match(KEYWORD_RE);
    let keyword, text;
    if (match) {
      keyword = match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
      text = step.text.slice(match[0].length).trim();
      firstSeen = true;
    } else {
      keyword = firstSeen ? 'And' : 'Given';
      text = step.text;
      firstSeen = true;
    }
    return { ...step, keyword, text };
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function renderStepLines(steps, baseIndent) {
  return withKeywords(steps)
    .map((s) => {
      const indent = baseIndent + '  '.repeat(s.depth);
      return `${indent}${s.keyword} ${s.text}`;
    })
    .join('\n');
}

// Renders one testAnnotation()'s data as comment lines above a Scenario:
//   # TMS: TABLE-001
//   # Bug: BUG-701          (or "# Bugs: BUG-701, BUG-702" if there's more than one)
//   # Severity: BLOCKER
// `annotation` may be a single {tms, bug, severity} object, an array of them
// (for tests with multiple `annotation: [ann1, ann2]`), or null/undefined.
function renderAnnotationComments(annotation, indent) {
  if (!annotation) return [];
  const anns = Array.isArray(annotation) ? annotation : [annotation];
  const lines = [];
  anns.forEach((a, i) => {
    if (i > 0) lines.push(`${indent}#`); // blank comment line between groups
    if (a.tms) lines.push(`${indent}# TMS: ${a.tms}`);
    const bugs = Array.isArray(a.bug) ? a.bug : a.bug ? [a.bug] : [];
    if (bugs.length === 1) lines.push(`${indent}# Bug: ${bugs[0]}`);
    else if (bugs.length > 1) lines.push(`${indent}# Bugs: ${bugs.join(', ')}`);
    if (a.severity) lines.push(`${indent}# Severity: ${a.severity}`);
  });
  return lines;
}

function renderFeature(feature, relPath) {
  const lines = [];
  lines.push(`# Auto-generated from ${relPath} — do not edit by hand.`);
  lines.push(`# Regenerate with generate-features.js after changing the tests.`);
  lines.push('');
  if (feature.tags.length) lines.push(feature.tags.join(' '));
  lines.push(`Feature: ${feature.title}`);
  lines.push('');

  if (feature.background.length || feature.backgroundLabel) {
    const label = feature.backgroundLabel ? `: ${feature.backgroundLabel}` : '';
    lines.push(`  Background${label}`);
    if (feature.background.length) {
      lines.push(renderStepLines(feature.background, '    '));
    }
    lines.push('');
  }

  for (const t of feature.tests) {
    const annotationComments = renderAnnotationComments(t.annotation, '  ');
    if (annotationComments.length) lines.push(...annotationComments);
    if (t.tags.length) lines.push(`  ${t.tags.join(' ')}`);
    lines.push(`  Scenario: ${t.name}`);
    if (t.steps.length) {
      lines.push(renderStepLines(t.steps, '    '));
    } else {
      lines.push('    (no test.step / allure.step calls found)');
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(TESTS_DIR)) {
    console.error(`Tests directory not found: ${TESTS_DIR}`);
    process.exit(1);
  }

  const specFiles = findSpecFiles(TESTS_DIR);
  if (!specFiles.length) {
    console.warn(`No *.spec.ts files found under ${TESTS_DIR}`);
    return;
  }

  let fileCount = 0;
  let featureCount = 0;
  let scenarioCount = 0;

  for (const specFile of specFiles) {
    const relPath = path.relative(TESTS_DIR, specFile);
    const features = parseSpecFile(specFile);
    if (!features.length) continue;

    const outRelDir = path.dirname(relPath);
    const outBaseName = path.basename(specFile).replace(/\.spec\.ts$/, '');
    const outDir = path.join(OUT_DIR, outRelDir);
    fs.mkdirSync(outDir, { recursive: true });

    // If a spec file has multiple describe blocks, suffix each output file.
    features.forEach((feature, idx) => {
      const suffix = features.length > 1 ? `-${idx + 1}` : '';
      const outPath = path.join(outDir, `${outBaseName}${suffix}.feature`);
      fs.writeFileSync(outPath, renderFeature(feature, relPath), 'utf8');
      featureCount += 1;
      scenarioCount += feature.tests.length;
      console.log(`Wrote ${path.relative(process.cwd(), outPath)}`);
    });

    fileCount += 1;
  }

  console.log(
    `\nDone. Parsed ${fileCount} spec file(s) -> ${featureCount} feature file(s), ${scenarioCount} scenario(s).`
  );
}

main();