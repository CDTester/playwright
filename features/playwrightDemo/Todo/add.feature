# Auto-generated from playwrightDemo\Todo\add.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo

  Background: Navigate to ToDoMVC App
    Given ${todoPage.url} has loaded

  # TMS: TODO-101
  # Bug: BUG-101
  # Severity: BLOCKER
  @smoke
  Scenario: Item can be added to ToDo list
    Given the toDo list is empty
    When an item is added
    Then the item is visible in the list

  # TMS: TODO-102
  # Bug: BUG-102
  # Severity: CRITICAL
  @regression
  Scenario: The input field should be cleared when the item is added
    Given the toDo list is empty
    When an item is added
    Then the item is cleared from the input field

  # TMS: TODO-103
  # Bug: BUG-103
  # Severity: NORMAL
  @regression
  Scenario: Item should be appended to the bottom of the list
    Given the toDo list is empty
    When 3 items are added
    Then the items should appear in the order they were added
    And there should be 3 items in the list
