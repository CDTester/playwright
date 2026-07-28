# Auto-generated from playwrightDemo\Todo\AI\complete-single.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Complete
Feature: Complete Todo Items

  Background: Setup items and navigate to ToDo app
    Given the app has loaded with items

  @smoke
  Scenario: Mark item as complete
    Given the app has items "Buy milk" and "Walk the dog"
    When I click the checkbox next to "Buy milk"
    Then "Buy milk" is marked as complete
    And "Buy milk" is displayed with strike-through styling
    And the counter displays "1 item left"
