# Auto-generated from playwrightDemo\Todo\AI\clear-completed.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @ClearCompleted
Feature: Clear Completed Items

  Background: Setup items with mixed completion and navigate to ToDo app
    Given the app has loaded with items

  @smoke
  Scenario: Clear all completed items
    Given items with "Buy milk" and "Read a book" marked as complete
    When I click the "Clear completed" button
    Then all completed items are removed
    And only "Walk the dog" remains
    And the counter displays "1 item left"
    And the "Clear completed" button is no longer visible
