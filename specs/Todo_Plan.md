# Todo_Plan

## Application Overview

The ToDo MVC application is a simple task management application that allows users to create, edit, complete, and delete todo items. The application provides filtering capabilities to view all items, only active items, or only completed items. It includes a counter to track the number of active items and provides bulk operations like marking all items as complete and clearing all completed items. The application uses localStorage to persist tasks across browser sessions.

## Test Scenarios

### 1. Add Todo Items

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 1.1. Add a single todo item

**File:** `tests/Todo/add-single.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the list is empty
  2. When I enter 'Buy milk' in the input field
  3. And I press Enter to submit the item
  4. Then the item 'Buy milk' is added to the list
  5. And the input field is cleared
  6. And the counter displays '1 item left'

**Expected Results:**
  - The item 'Buy milk' is successfully added to the list
  - The input field is cleared and ready for the next item
  - The todo item counter displays '1 item left'

#### 1.2. Add multiple todo items

**File:** `tests/Todo/add-multiple.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the list is empty
  2. When I add 'Buy milk' and press Enter
  3. Then 'Buy milk' appears in the list
  4. When I add 'Walk the dog' and press Enter
  5. Then 'Walk the dog' is appended to the bottom of the list
  6. When I add 'Read a book' and press Enter
  7. Then 'Read a book' is appended to the bottom of the list
  8. And the counter displays '3 items left'

**Expected Results:**
  - All three items appear in the list in the order they were added
  - The todo item counter displays '3 items left'
  - Each new item is appended to the bottom of the list

#### 1.3. Empty item should not be added

**File:** `tests/Todo/add-empty.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the list is empty
  2. When I leave the input field empty
  3. And I press Enter
  4. Then no item is added to the list
  5. And the counter displays '0 items left'

**Expected Results:**
  - Empty items are not added to the list
  - The input field remains empty
  - The counter shows '0 items left'

#### 1.4. Whitespace-only item should not be added

**File:** `tests/Todo/add-whitespace.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the list is empty
  2. When I enter only whitespace characters in the input field
  3. And I press Enter
  4. Then no item is added to the list
  5. And the counter displays '0 items left'

**Expected Results:**
  - Items with only whitespace are not added to the list
  - The input field is cleared
  - The counter shows '0 items left'

#### 1.5. Add item with special characters

**File:** `tests/Todo/add-special-chars.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the list is empty
  2. When I enter 'Buy milk @$#%!' with special characters in the input field
  3. And I press Enter
  4. Then the item 'Buy milk @$#%!' is added to the list
  5. And the special characters are preserved
  6. And the counter displays '1 item left'

**Expected Results:**
  - Items with special characters are successfully added
  - Special characters are preserved in the display
  - The counter displays '1 item left'

#### 1.6. Add item with very long text

**File:** `tests/Todo/add-long-text.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the list is empty
  2. When I enter a long text item with 100+ characters
  3. And I press Enter
  4. Then the long item is added and fully displayed in the list
  5. And the counter displays '1 item left'

**Expected Results:**
  - Long text items are successfully added
  - The long text is visible in the list
  - The counter displays '1 item left'

### 2. Complete Todo Items

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 2.1. Mark item as complete

**File:** `tests/Todo/complete-single.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk' and 'Walk the dog'
  2. When I click the checkbox next to 'Buy milk'
  3. Then 'Buy milk' is marked as complete
  4. And 'Buy milk' is displayed with strike-through styling
  5. And the counter displays '1 item left'

**Expected Results:**
  - 'Buy milk' is marked as complete
  - 'Buy milk' is displayed with strike-through styling
  - The counter decreases from '2 items left' to '1 item left'

#### 2.2. Mark completed item as incomplete

**File:** `tests/Todo/incomplete.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk' marked as complete
  2. When I click the checkbox next to 'Buy milk'
  3. Then 'Buy milk' is marked as incomplete
  4. And the strike-through styling is removed
  5. And the counter displays '1 item left'

**Expected Results:**
  - The completed item returns to active state
  - The strike-through styling is removed
  - The counter increases back to '1 item left'

#### 2.3. Mark all items as complete

**File:** `tests/Todo/mark-all-complete.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk', 'Walk the dog', and 'Read a book'
  2. When I click the 'Mark all as complete' checkbox
  3. Then all items are marked as complete
  4. And all items are displayed with strike-through styling
  5. And the counter displays '0 items left'

**Expected Results:**
  - All items are marked as complete with strike-through styling
  - The counter displays '0 items left'
  - The 'Mark all as complete' checkbox is checked

#### 2.4. Unmark all items when all are complete

**File:** `tests/Todo/unmark-all-complete.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with all items marked as complete
  2. When I click the 'Mark all as complete' checkbox
  3. Then all items are marked as incomplete
  4. And the strike-through styling is removed from all items
  5. And the counter displays '3 items left'

**Expected Results:**
  - All items return to active state
  - Strike-through styling is removed from all items
  - The counter displays '3 items left'

### 3. Delete Todo Items

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 3.1. Delete a todo item

**File:** `tests/Todo/delete-item.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk' and 'Walk the dog'
  2. When I hover over 'Buy milk'
  3. And I click the delete button (×) for 'Buy milk'
  4. Then 'Buy milk' is removed from the list
  5. And 'Walk the dog' is still in the list
  6. And the counter displays '1 item left'

**Expected Results:**
  - 'Buy milk' is removed from the list
  - Only 'Walk the dog' remains in the list
  - The counter decreases to '1 item left'

#### 3.2. Delete a completed item

**File:** `tests/Todo/delete-completed.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. And 'Buy milk' is marked as complete
  3. When I click the delete button (×) for 'Buy milk'
  4. Then 'Buy milk' is removed from the list
  5. And the counter displays '0 items left'

**Expected Results:**
  - Completed items can be deleted
  - The item is removed from the list
  - The counter shows '0 items left'

### 4. Edit Todo Items

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 4.1. Edit todo item and save via Enter

**File:** `tests/Todo/edit-enter.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. When I double-click on 'Buy milk' to enter edit mode
  3. And I clear the text and type 'Buy cheese'
  4. And I press Enter to save
  5. Then the item is updated to 'Buy cheese'
  6. And edit mode is exited
  7. And the updated item is visible in the list

**Expected Results:**
  - The item text is updated to 'Buy cheese'
  - Edit mode is exited
  - The updated item is visible in the list

#### 4.2. Edit todo item and save via blur

**File:** `tests/Todo/edit-blur.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. When I double-click on 'Buy milk' to enter edit mode
  3. And I clear the text and type 'Buy eggs'
  4. And I click outside the input field to blur it
  5. Then the item is updated to 'Buy eggs'
  6. And edit mode is exited
  7. And the updated item is visible in the list

**Expected Results:**
  - The item text is updated to 'Buy eggs'
  - Edit mode is exited when the field loses focus
  - The updated item is visible in the list

#### 4.3. Cancel edit with Escape key

**File:** `tests/Todo/edit-cancel.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. When I double-click on 'Buy milk' to enter edit mode
  3. And I type different text 'Buy cheese'
  4. And I press Escape key
  5. Then edit mode is cancelled
  6. And the item still displays 'Buy milk'
  7. And no changes are saved

**Expected Results:**
  - Edit mode is cancelled
  - The original text 'Buy milk' is preserved
  - No changes are saved

#### 4.4. Delete item by saving empty edit

**File:** `tests/Todo/edit-delete.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. When I double-click on 'Buy milk' to enter edit mode
  3. And I clear all text
  4. And I press Enter to save
  5. Then the item is removed from the list
  6. And the counter displays '0 items left'

**Expected Results:**
  - Saving an empty edit removes the item
  - The item is deleted from the list
  - The counter shows '0 items left'

#### 4.5. Whitespace is trimmed when editing item

**File:** `tests/Todo/edit-whitespace.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. When I double-click on 'Buy milk' to enter edit mode
  3. And I enter '  Buy cheese  ' with leading and trailing spaces
  4. And I press Enter to save
  5. Then the item displays 'Buy cheese' without extra spaces
  6. And the item is saved successfully

**Expected Results:**
  - Leading and trailing whitespace is trimmed
  - The item displays 'Buy cheese' without extra spaces
  - The item is saved successfully

### 5. Filter Todo Items

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 5.1. Filter to show all items

**File:** `tests/Todo/filter-all.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk', 'Walk the dog', and 'Read a book'
  2. And 'Buy milk' is marked as complete
  3. When I click the 'All' filter
  4. Then all items (active and completed) are displayed
  5. And the 'All' filter link is highlighted

**Expected Results:**
  - The 'All' filter shows all items regardless of status
  - Both active and completed items are visible
  - The 'All' filter link is highlighted

#### 5.2. Filter to show only active items

**File:** `tests/Todo/filter-active.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk', 'Walk the dog', and 'Read a book'
  2. And 'Buy milk' is marked as complete
  3. When I click the 'Active' filter
  4. Then only active items ('Walk the dog' and 'Read a book') are displayed
  5. And completed items are not visible
  6. And the 'Active' filter link is highlighted

**Expected Results:**
  - The 'Active' filter shows only incomplete items
  - 'Walk the dog' and 'Read a book' are visible
  - 'Buy milk' is not visible
  - The 'Active' filter link is highlighted

#### 5.3. Filter to show only completed items

**File:** `tests/Todo/filter-completed.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk', 'Walk the dog', and 'Read a book'
  2. And 'Buy milk' is marked as complete
  3. When I click the 'Completed' filter
  4. Then only completed items ('Buy milk') are displayed
  5. And active items are not visible
  6. And the 'Completed' filter link is highlighted

**Expected Results:**
  - The 'Completed' filter shows only completed items
  - Only 'Buy milk' is visible
  - 'Walk the dog' and 'Read a book' are not visible
  - The 'Completed' filter link is highlighted

#### 5.4. Add item while on Active filter view

**File:** `tests/Todo/filter-add-while-active.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk' marked as complete
  2. And item 'Walk the dog' is active
  3. When I click the 'Active' filter
  4. And I add new item 'Read a book'
  5. Then 'Read a book' is immediately visible in the filtered list
  6. And 'Walk the dog' is still visible

**Expected Results:**
  - New items can be added while on Active filter view
  - New active items appear immediately in the Active filter view
  - The new item is visible without changing filter

### 6. Clear Completed Items

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 6.1. Clear all completed items

**File:** `tests/Todo/clear-completed.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with items 'Buy milk', 'Walk the dog', and 'Read a book'
  2. And 'Buy milk' and 'Read a book' are marked as complete
  3. When I click the 'Clear completed' button
  4. Then all completed items are removed from the list
  5. And only 'Walk the dog' remains
  6. And the counter displays '1 item left'

**Expected Results:**
  - All completed items are removed from the list
  - Only 'Walk the dog' remains
  - The counter shows '1 item left'
  - The 'Clear completed' button is no longer visible

#### 6.2. Clear completed button visibility toggling

**File:** `tests/Todo/clear-completed-visibility.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. Then the 'Clear completed' button is not visible
  3. When I add item 'Buy milk'
  4. Then the 'Clear completed' button is still not visible
  5. When I mark 'Buy milk' as complete
  6. Then the 'Clear completed' button is now visible
  7. When I click 'Clear completed'
  8. Then the 'Clear completed' button is no longer visible

**Expected Results:**
  - The 'Clear completed' button is hidden when no items are complete
  - The button appears when at least one item is marked as complete
  - The button is hidden again after clearing all completed items

### 7. Counter Display

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 7.1. Counter correctly tracks active items

**File:** `tests/Todo/counter-tracking.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. Then the counter displays '0 items left'
  3. When I add item 'Buy milk'
  4. Then the counter displays '1 item left'
  5. When I add item 'Walk the dog'
  6. Then the counter displays '2 items left'
  7. When I mark 'Buy milk' as complete
  8. Then the counter displays '1 item left'

**Expected Results:**
  - Counter starts at 0
  - Counter increments when items are added
  - Counter decrements when items are marked complete
  - Counter updates in real-time

#### 7.2. Counter displays singular for one active item

**File:** `tests/Todo/counter-singular.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I add one item 'Buy milk'
  3. Then the counter text displays '1 item left' (singular)

**Expected Results:**
  - Counter correctly uses singular 'item' when count is 1
  - The text reads '1 item left'

#### 7.3. Counter displays plural for multiple active items

**File:** `tests/Todo/counter-plural.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I add item 'Buy milk'
  3. And I add item 'Walk the dog'
  4. Then the counter text displays '2 items left' (plural)

**Expected Results:**
  - Counter correctly uses plural 'items' when count is greater than 1
  - The text reads '2 items left'

### 8. Persistence and LocalStorage

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 8.1. Todo items persist after page reload

**File:** `tests/Todo/persistence-data.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I add items 'Buy milk' and 'Walk the dog'
  3. And I mark 'Buy milk' as complete
  4. And I reload the page
  5. Then 'Buy milk' and 'Walk the dog' are still in the list
  6. And 'Buy milk' is still marked as complete
  7. And the counter displays '1 item left'

**Expected Results:**
  - Items persist after page reload
  - Item completion status is preserved
  - The counter displays '1 item left'
  - All data is retrieved from localStorage

#### 8.2. Empty list persists after page reload

**File:** `tests/Todo/persistence-empty.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I reload the page
  3. Then the list remains empty
  4. And the counter displays '0 items left'

**Expected Results:**
  - An empty list state persists
  - The counter shows '0 items left'

### 9. User Interface and Navigation

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 9.1. App loads with correct title and heading

**File:** `tests/Todo/app-load.spec.ts`

**Steps:**
  1. Given I navigate to https://demo.playwright.dev/todomvc/#/
  2. Then the page title is 'React • TodoMVC'
  3. And the main heading displays 'todos'
  4. And the input field placeholder reads 'What needs to be done?'

**Expected Results:**
  - Page title is correctly set to 'React • TodoMVC'
  - Main heading displays 'todos'
  - The interface loads properly

#### 9.2. Input field is focused on page load

**File:** `tests/Todo/input-focus.spec.ts`

**Steps:**
  1. Given I navigate to the ToDo app
  2. Then the input field 'What needs to be done?' is focused
  3. And I can start typing without clicking

**Expected Results:**
  - The input field is automatically focused
  - Users can start typing immediately without clicking

#### 9.3. Footer displays helpful information

**File:** `tests/Todo/footer-display.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. Then the footer displays 'Double-click to edit a todo'
  3. And the footer displays creator information
  4. And the footer contains a link to TodoMVC

**Expected Results:**
  - Footer instructions are visible
  - Creator information is displayed
  - Footer provides helpful guidance to users

### 10. Keyboard Navigation and Accessibility

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 10.1. Add item using keyboard only

**File:** `tests/Todo/keyboard-add.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded and the input field is focused
  2. When I type 'Buy milk' without using the mouse
  3. And I press Enter
  4. Then the item is added to the list
  5. And focus returns to the input field
  6. And I can immediately type another item

**Expected Results:**
  - Items can be added using only keyboard
  - Enter key submits the form
  - Focus management works correctly

#### 10.2. Navigate through interactive elements with Tab key

**File:** `tests/Todo/keyboard-tab.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with an item 'Buy milk'
  2. When I press Tab to navigate to the mark all complete checkbox
  3. And I continue pressing Tab through all interactive elements
  4. Then all interactive elements are reachable
  5. And focus indicators are visible
  6. And Tab order is logical

**Expected Results:**
  - All interactive elements are reachable via Tab
  - Tab order is logical and intuitive
  - Focus indicators are visible

#### 10.3. Checkboxes have proper accessibility attributes

**File:** `tests/Todo/checkbox-accessibility.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded with item 'Buy milk'
  2. Then the checkbox has accessible label 'Toggle Todo'
  3. When I use keyboard to navigate to the checkbox
  4. And I press Space or Enter to toggle it
  5. Then the checkbox state changes
  6. And the state is properly announced

**Expected Results:**
  - Checkboxes have proper aria labels
  - Checkboxes are keyboard accessible
  - State changes are properly indicated

### 11. Edge Cases and Error Handling

**Seed:** `tests/Todo/AI/seed.spec.ts`

#### 11.1. Handle very large number of items

**File:** `tests/Todo/edge-many-items.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I add 100 todo items
  3. Then all items are visible in the list
  4. And the counter displays '100 items left'
  5. And the application remains responsive

**Expected Results:**
  - Application handles large numbers of items
  - Performance remains acceptable with many items
  - Counter displays correctly for large numbers

#### 11.2. Handle items with Unicode and emoji characters

**File:** `tests/Todo/edge-unicode.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I add item '🛒 Buy milk'
  3. Then the emoji displays correctly
  4. When I add item with Chinese characters '買牛奶'
  5. Then all Unicode characters are displayed correctly

**Expected Results:**
  - Unicode characters are properly handled
  - Emojis display correctly
  - International characters are preserved

#### 11.3. Handle rapid consecutive item additions

**File:** `tests/Todo/edge-rapid-add.spec.ts`

**Steps:**
  1. Given the ToDo app has loaded
  2. When I rapidly add 10 items in quick succession
  3. Then all 10 items are added in order
  4. And the counter displays '10 items left'
  5. And no items are skipped or lost

**Expected Results:**
  - Application handles rapid additions
  - All items are saved
  - No items are skipped or lost
