# Todo_Plan

## Application Overview

Test plan for the TodoMVC demo app (https://demo.playwright.dev/todomvc/). Covers core functionality, filters, editing, persistence, edge cases, accessibility, and negative scenarios. Each test assumes a clean application state (no existing ToDo items) and is written so it can be executed independently.

## Test Scenarios

### 1. Core: Add / Remove / Complete ✅

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add a single ToDo item

**File:** `tests/Todo/add-todo.spec.ts`

**Steps:**
  1. 1. Navigate to the ToDo app (`todoPage.goto()`).
  2. 2. Ensure the list is empty (assume fresh state).
  3. 3. In the input `input.new-todo`, type `Buy milk` and press Enter.
  4. 4. Verify the input field is cleared.
  5. 5. Verify `Buy milk` is appended to the bottom of the list and is visible.
  6. 6. Verify the counter shows `1 item left`. 

**Expected Results:**
  - - The new item `Buy milk` is visible in the list.
  - - Input is cleared after adding.
  - - `todo-count` shows the correct number.
Assumptions: app starts with no items. Success criteria: item displayed and counter correct. Failure conditions: item not added, counter incorrect.

#### 1.2. Add multiple ToDo items

**File:** `tests/Todo/add-multiple.spec.ts`

**Steps:**
  1. 1. Navigate to the app.
  2. 2. Add the items `Task A`, `Task B`, `Task C` sequentially (press Enter each time).
  3. 3. Verify all three items appear in order (Task A at top or bottom per implementation) and are visible.
  4. 4. Verify counter reads `3 items left`. 

**Expected Results:**
  - - All three items are present and visible in the list in the order added.
Assumptions: blank start. Success criteria: items present and counter accuracy. Failure: missing items or wrong order.

#### 1.3. Remove a ToDo item

**File:** `tests/Todo/remove.spec.ts`

**Steps:**
  1. 1. Start with items: `X`, `Y` (add them).
  2. 2. Hover the `X` item to reveal delete control.
  3. 3. Click the delete button for `X`.
  4. 4. Verify `X` is removed and `Y` remains.
  5. 5. Verify counter decremented accordingly.

**Expected Results:**
  - - `X` is removed from DOM and not visible; `Y` still present.
Assumptions: hover reveals delete control. Success criteria: deleted item removed. Failure: unable to delete or wrong item removed.

#### 1.4. Complete and uncomplete an item

**File:** `tests/Todo/complete.spec.ts`

**Steps:**
  1. 1. Add `Finish report` to the list.
  2. 2. Click the checkbox for `Finish report` to mark complete.
  3. 3. Verify the item has completed styling/state and the counter updates.
  4. 4. Click checkbox again to uncomplete and verify state returns to active and counter updates.

**Expected Results:**
  - - Item toggles between complete and active states and counter updates accordingly.
Assumptions: checkboxes are reachable and update DOM. Success criteria: visual state and counter reflect completion status. Failure: state mismatch or counter incorrect.

#### 1.5. Toggle all (Mark all as complete/uncomplete)

**File:** `tests/Todo/toggle-all.spec.ts`

**Steps:**
  1. 1. Add multiple items: `1`, `2`, `3`.
  2. 2. Click `Mark all as complete` checkbox.
  3. 3. Verify all items become completed and counter is `0 items left`.
  4. 4. Uncheck `Mark all` and verify all items are active and counter is `3 items left`. 

**Expected Results:**
  - - `markAll` successfully checks/unchecks all items and updates counter.
Assumptions: `Mark all` control exists. Success criteria: consistent toggling. Failure: partial toggles.

### 2. Editing & Persistence ✏️

**Seed:** `tests/seed.spec.ts`

#### 2.1. Edit ToDo and save via Enter

**File:** `tests/Todo/edit-enter.spec.ts`

**Steps:**
  1. 1. Add `Old name` to the list.
  2. 2. Double-click the `Old name` item to enter edit mode.
  3. 3. Replace text with `New name` and press Enter.
  4. 4. Verify the item text updates to `New name` and edit box is closed.

**Expected Results:**
  - - Item text is updated to `New name`.
Assumptions: edit control uses label `Edit`. Success criteria: edit persists in DOM. Failure: old text remains or edit fails.

#### 2.2. Edit ToDo and save via blur

**File:** `tests/Todo/edit-blur.spec.ts`

**Steps:**
  1. 1. Add `Blur name` to the list.
  2. 2. Double-click to edit and replace with `Blurred`.
  3. 3. Trigger blur (click outside) to save.
  4. 4. Verify text saved as `Blurred`. 

**Expected Results:**
  - - Edit saved on blur and item shows `Blurred`.
Assumptions: blur triggers save. Success criteria: saved value visible. Failure: loss of change.

#### 2.3. Edit ToDo and cancel via Escape

**File:** `tests/Todo/edit-escape.spec.ts`

**Steps:**
  1. 1. Add `Cancel me`.
  2. 2. Double-click to edit and change to `Should not save`.
  3. 3. Press Escape to cancel edit.
  4. 4. Verify original text `Cancel me` remains.

**Expected Results:**
  - - Escape cancels the edit and original text remains.
Assumptions: Escape behavior supported. Success: no change applied. Failure: change persisted unexpectedly.

#### 2.4. Persistence after page reload

**File:** `tests/Todo/persistence.spec.ts`

**Steps:**
  1. 1. Add items: `Persist A`, `Persist B` and mark `Persist B` complete.
  2. 2. Reload the page.
  3. 3. Verify both items remain present and `Persist B` still completed.
  4. 4. Verify counter persists appropriately.

**Expected Results:**
  - - Items and their completion state persist after reload.
Assumptions: app uses localStorage or persistent storage. Success: state preserved. Failure: state lost on reload.

### 3. Filters & Bulk Actions 🔎

**Seed:** `tests/seed.spec.ts`

#### 3.1. Filter views (All, Active, Completed)

**File:** `tests/Todo/filters.spec.ts`

**Steps:**
  1. 1. Add `A`, `B`, `C` and mark `B` complete.
  2. 2. Click `Active` filter and verify only `A` and `C` visible.
  3. 3. Click `Completed` and verify only `B` visible.
  4. 4. Click `All` and verify all 3 visible again.
  5. 5. Verify filter link updates the URL to `/active` and `/completed` respectively.

**Expected Results:**
  - - Filters show correct subsets and URLs update to expected routes.
Assumptions: filters are links with roles. Success: correct items visible per filter. Failure: incorrect filtering or URL mismatch.

#### 3.2. Clear completed removes only completed items

**File:** `tests/Todo/clear-completed.spec.ts`

**Steps:**
  1. 1. Add `a`, `b`, `c` and mark `b` complete.
  2. 2. Click `Clear completed` button.
  3. 3. Verify `b` is removed while `a` and `c` remain.
  4. 4. Verify counter reflects remaining active items.

**Expected Results:**
  - - Only completed items removed and the rest remain.
Assumptions: clear button exists and is enabled when completed items present. Success: correct deletion. Failure: wrong items removed.

### 4. Edge Cases & Negative Tests ⚠️

**Seed:** `tests/seed.spec.ts`

#### 4.1. Blank input should not add an item

**File:** `tests/Todo/edge-blank.spec.ts`

**Steps:**
  1. 1. With fresh state, focus the input and press Enter with empty value.
  2. 2. Verify no item is added and counter remains `0 items left`. 

**Expected Results:**
  - - No new item is created from an empty input.
Assumptions: no whitespace-trimming policy that converts empty to non-empty. Success: no-op. Failure: empty/blank item added.

#### 4.2. Long text item (boundary)

**File:** `tests/Todo/edge-longtext.spec.ts`

**Steps:**
  1. 1. Create a long string (e.g., 500–2000 characters) and add it as a ToDo.
  2. 2. Verify the item is added and displayed; check for truncation or overflow behaviour.
  3. 3. Verify editing and deletion still works on long item.

**Expected Results:**
  - - Long text is accepted or gracefully handled; operations still work.
Assumptions: UI supports long text scrolling/truncation. Success: no crash. Failure: UI breaks or item lost.

#### 4.3. Special characters, whitespace and Unicode

**File:** `tests/Todo/edge-specialchars.spec.ts`

**Steps:**
  1. 1. Add items with special chars: `¡Hola!`, `测试`, `   leading`, `trailing   `, and `tab	char`.
  2. 2. Verify items are displayed as expected and searchable/interactive.

**Expected Results:**
  - - Special characters and whitespace preserved or normalized per product rules.
Assumptions: application permits Unicode. Success: no encoding errors. Failure: loss or corruption of characters.

#### 4.4. Simulate localStorage failure (negative)

**File:** `tests/Todo/edge-localstorage.spec.ts`

**Steps:**
  1. 1. In a fresh page, override `window.localStorage` to throw on setItem (simulate quota or failure).
  2. 2. Attempt to add an item.
  3. 3. Verify app handles the error gracefully (no unhandled exception), and UI provides a fallback (e.g., still shows item in-memory or shows an error).

**Expected Results:**
  - - App does not crash with uncaught errors; errors are handled or surfaced gracefully.
Assumptions: test harness can stub `localStorage`. Success: app remains usable. Failure: uncaught exception or blank page.

### 5. Accessibility & Keyboard / UX 🧭

**Seed:** `tests/seed.spec.ts`

#### 5.1. Add item using keyboard only (tab + enter)

**File:** `tests/Todo/accessibility-add.spec.ts`

**Steps:**
  1. 1. Start with blank list, focus the input (via Tab), type `Keyboard` and press Enter using keyboard actions.
  2. 2. Verify the item is added.
  3. 3. Verify tab order reaches interactive controls (checkbox, delete) in a logical sequence.

**Expected Results:**
  - - Keyboard add works and tab order is logical.
Assumptions: app supports keyboard input and roles. Success: accessibility-friendly controls. Failure: unreachable controls via keyboard.

#### 5.2. Checkboxes and roles present for screen readers

**File:** `tests/Todo/accessibility-roles.spec.ts`

**Steps:**
  1. 1. Inspect DOM for appropriate roles (`list`, `listitem`, checkboxes with accessible labels).
  2. 2. Verify `GetByLabel('Toggle Todo')` and `getByRole('list')` target elements correctly.

**Expected Results:**
  - - ARIA roles and labels present and interactive elements discoverable by assistive technologies.
Assumptions: developers added roles/testids. Success: elements accessible. Failure: missing roles/labels.

#### 5.3. Responsive layout (mobile viewport)

**File:** `tests/Todo/responsive.spec.ts`

**Steps:**
  1. 1. Set viewport to a mobile size (e.g., 375x812).
  2. 2. Add items and verify UI remains usable and no elements overlap or become inaccessible.
  3. 3. Verify filters and clear completed are reachable in mobile layout.

**Expected Results:**
  - - App remains usable at mobile viewports; controls accessible and layout not broken.
Assumptions: app is responsive. Success: usable mobile experience. Failure: broken layout or hidden controls.
