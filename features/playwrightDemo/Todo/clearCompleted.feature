# Auto-generated from playwrightDemo\Todo\clearCompleted.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Clear
Feature: Clear Completed Todo

  Background: Navigate to ToDoMVC App and add items
    Given ${todoPage.url} has loaded
    And 4 items are added to the list

  # TMS: TODO-111
  # Bug: BUG-111
  # Severity: BLOCKER
  @smoke
  Scenario: The 'Clear Completed' button is hidden when there are no completed items
    Given the todo list has 4 items
    When the "All" filter is selected
    Then the 'Clear Completed' button is hidden

  # TMS: TODO-112
  # Bug: BUG-112
  # Severity: NORMAL
  @regression
  Scenario: The 'Clear Completed' button is visible when there are completed items
    Given the todo list has 4 items
    And the 'Clear Completed' button is hidden
    When at least 1 item is completed
    Then the 'Clear Completed' button is visible

  # TMS: TODO-113
  # Bug: BUG-113
  # Severity: MINOR
  @regression
  Scenario: The 'Clear Completed' button should remove completed items
    Given the todo list has 4 items
    And at least 2 items are completed
    When the 'Clear Completed' button is clicked
    Then the completed items are removed
