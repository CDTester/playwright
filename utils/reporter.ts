import {TestDetailsAnnotation } from '@playwright/test';

/**
 * testAnnotation is a utility function that creates an array of TestDetailsAnnotation objects for playwright reports.
 * @param tms - The Test Management System (TMS) identifier for the test case.
 * @param bugs - The bug tracking system identifier for the associated bug.
 * @param severity - The severity level of the test case (e.g., BLOCKER, CRITICAL, NORMAL, MINOR, TRIVIAL).
 * @returns An array of TestDetailsAnnotation objects containing TMS, BUGS, and SEVERITY annotations.
 * @example
 * [
 *    { 'type': 'TMS', 'description': `${process.env.TMS_URL}${tms}` },
 *    { 'type': 'BUGS', 'description': `${process.env.JIRA_URL}${bugs}` },
 *    { 'type': 'SEVERITY', 'description': severity }</p>
 * ]
 */
export function testAnnotation(tms: string, bugs: string | string[], severity: string): TestDetailsAnnotation[] {
  let parsedBugs: string = '';
  if (typeof bugs === 'object') {
    let mappedbugs: string[] = bugs.map((bug) => `${process.env.JIRA_URL}${bug}`);
    parsedBugs = mappedbugs.join(", ");
  }
  else {
    parsedBugs = `${process.env.JIRA_URL}${bugs}`;
  }
    return [
      { type: 'TMS', description: `${process.env.TMS_URL}${tms}` },
      { type: 'BUGS', description: parsedBugs },
      { type: 'SEVERITY', description: severity }
    ] as TestDetailsAnnotation[];
  }