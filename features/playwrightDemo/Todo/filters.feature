# Auto-generated from playwrightDemo\Todo\filters.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Filter
Feature: Todo Filters

  Background: Navigate to ToDoMVC App
    Given ${todoPage.url} has loaded

  # TMS: TODO-161
  # Bug: BUG-161
  # Severity: BLOCKER
  @smoke
  Scenario: There should be 3 filters available when there are items on the list
    Given the todo list is empty
    And the filters are not visisble
    When items are added
    Then the 'All' filter should be visible and selected by default
    And the 'Active' filter should be visible
    And the 'Completed' filter should be visible

  # TMS: TODO-162
  # Bug: BUG-162
  # Severity: CRITICAL
  @regression
  Scenario: The 'All' filter should show active and completed items
    Given the todo list has 4 items
    And 2 items are completed
    When the 'All' filter is selected
    Then all 4 items are still visible

  # TMS: TODO-163
  # Bug: BUG-163
  # Severity: NORMAL
  @regression
  Scenario: The 'Active' filter should show only active items
    Given the todo list has 4 items
    And 1 item is completed
    When the 'Active' filter is selected
    Then only 3 items are visible

  # TMS: TODO-164
  # Bug: BUG-163
  # Severity: MINOR
  @regression
  Scenario: The 'Completed' filter should only show completed items
    Given the todo list has 4 items
    And 1 items is completed
    When the 'Completed' filter is selected
    Then only 1 item is visible
