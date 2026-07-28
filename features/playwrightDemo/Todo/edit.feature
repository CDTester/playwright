# Auto-generated from playwrightDemo\Todo\edit.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Edit
Feature: Edit Todo

  Background: Navigate to ToDoMVC App
    Given ${todoPage.url} has loaded

  # TMS: TODO-151
  # Bug: BUG-151
  # Severity: BLOCKER
  @smoke
  Scenario: Complete Checkbox should be hidden when editing
    Given the todo list already has 3 items
    When the second item is edited
    Then the complete item checkbox will not be visible

  # TMS: TODO-152
  # Bug: BUG-152
  # Severity: CRITICAL
  @regression
  Scenario: Edits are saved when the edit field is unfocused
    Given the todo list already has 3 items
    When an item is edited and clicking outside the edit field
    Then the changes are saved

  # TMS: TODO-153
  # Bug: BUG-153
  # Severity: NORMAL
  @regression
  Scenario: Edits are saved when Enter is pressed
    Given the todo list already has 3 items
    When an item is edited and Enter is pressed
    Then the changes are saved

  # TMS: TODO-154
  # Bug: BUG-154
  # Severity: MINOR
  @regression
  Scenario: Whitespace before and after text is removed when saving
    Given the todo list already has 3 items
    When an item is edited with spaces before and after text
    Then the spaces are removed when saved

  # TMS: TODO-155
  # Bug: BUG-155
  # Severity: TRIVIAL
  @regression
  Scenario: Cancel edit by using escape
    Given the todo list already has 3 items
    When the escape key is pressed during edit
    Then the the changes are not saved
