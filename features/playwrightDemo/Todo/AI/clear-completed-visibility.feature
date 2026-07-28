# Auto-generated from playwrightDemo\Todo\AI\clear-completed-visibility.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @ClearCompleted
Feature: Clear Completed Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Clear completed button visibility toggling
    Given the app is empty
    When I add item "Buy milk"
    Then the "Clear completed" button is still not visible
    When I mark "Buy milk" as complete
    Then the "Clear completed" button is now visible
    When I click "Clear completed"
    Then the "Clear completed" button is no longer visible
