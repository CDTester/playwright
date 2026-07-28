# Auto-generated from playwrightDemo\Todo\AI\persistence-data.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Persistence
Feature: Persistence and LocalStorage

  Background: Navigate to ToDo app
    Given the app has loaded

  @smoke
  Scenario: Todo items persist after page reload
    When I add items "Buy milk" and "Walk the dog"
    And I mark "Buy milk" as complete
    And I reload the page
    Then "Buy milk" and "Walk the dog" are still in the list
    And "Buy milk" is still marked as complete
    And the counter displays "1 item left"
