# Auto-generated from playwrightDemo\Todo\complete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Complete
Feature: Complete Todo

  Background: Navigate to ToDoMVC App
    Given ${todoPage.url} has loaded

  # TMS: TODO-121
  # Bug: BUG-121
  # Severity: BLOCKER
  @smoke
  Scenario: All items checkbox should be initially unchecked
    Given the todo list is empty
    When 3 items are added to the todo list
    Then the complete item checkbox will be visible
    And the complete item checkbox will be unchecked

  # TMS: TODO-122
  # Bug: BUG-122
  # Severity: CRITICAL
  @regression
  Scenario: Items can be marked as complete
    Given the todo list already has 3 items
    When the first item is marked as complete
    Then the complete checkbox wil be checked
    And the items text will be struckthrough

  # TMS: TODO-123
  # Bug: BUG-123
  # Severity: NORMAL
  @regression
  Scenario: Completed item can be marked as active again
    Given the todo list already has 3 items
    And the first item is marked as complete
    When the item is un-checked
    Then the complete checkbox wil be checked
    And the items text will no longer be struckthrough

  # TMS: TODO-124
  # Bug: BUG-124
  # Severity: MINOR
  @regression
  Scenario: All items can be marked as completed in one click
    Given the todo list already has 3 items
    And the item are not marked as complete
    When the 'mark all' button is clicked
    Then the completed item checkboxes will be checked

  # TMS: TODO-125
  # Bug: BUG-125
  # Severity: TRIVIAL
  @regression
  Scenario: All completed items can be marked as incomplete in one click
    Given the todo list already has 3 items
    And all the items are marked as complete
    When the 'mark all' button is clicked again
    Then the completed item checkboxes will not be checked
