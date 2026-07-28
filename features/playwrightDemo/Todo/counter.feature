# Auto-generated from playwrightDemo\Todo\counter.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Counter
Feature: Todo Counter

  Background: Navigate to ToDoMVC App
    Given ${todoPage.url} has loaded

  # TMS: TODO-131
  # Bug: BUG-131
  # Severity: BLOCKER
  @smoke
  Scenario: The counter should increase when an item is added
    Given the todo list is empty
    When an item is added
    Then the counter should say '1 item left'

  # TMS: TODO-132
  # Bug: BUG-132
  # Severity: CRITICAL
  @regression
  Scenario: The counter should decrease WHEN an item is completed
    Given the todo list has 4 items
    And the counter says '4 items left'
    When an item is marked as complete
    Then the counter should say '3 items left'

  # TMS: TODO-133
  # Bug: BUG-133
  # Severity: NORMAL
  @regression
  Scenario: The counter should display 0 items left WHEN all items are complete
    Given the todo list has 4 items
    And the counter says '4 items left'
    When all items are completed
    Then the counter should say '0 items left'

  # TMS: TODO-134
  # Bug: BUG-134
  # Severity: MINOR
  @regression
  Scenario: The counter should decrease WHEN an item is deleted
    Given the todo list has 4 items
    And the counter says '4 items left'
    When an item is deleted
    Then the counter should say '3 items left'
