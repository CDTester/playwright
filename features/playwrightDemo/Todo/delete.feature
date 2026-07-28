# Auto-generated from playwrightDemo\Todo\delete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Delete
Feature: Delete Todo

  Background: Navigate to ToDoMVC App
    Given ${todoPage.url} has loaded

  # TMS: TODO-141
  # Bug: BUG-141
  # Severity: BLOCKER
  @smoke
  Scenario: The delete button should be visible when hovering over an item
    Given the todo list already has 1 item
    And the delete button is not visible
    When an item is hovered over
    Then the delete button is visible

  # TMS: TODO-142
  # Bug: BUG-142
  # Severity: CRITICAL
  @regression
  Scenario: An item can be removed from using the delete button
    Given the todo list already has 3 items
    When the delete button clicked on the first item
    Then the first item is removed from the list

  # TMS: TODO-143
  # Bug: BUG-143
  # Severity: NORMAL
  @regression
  Scenario: An item can be removed when an empty text string is entered during edit
    Given the todo list already has 3 items
    When the second item is edited and an empty string is entered
    Then the second item is removed from the list
