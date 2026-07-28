# Auto-generated from playwrightDemo\Todo\AI\incomplete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Complete
Feature: Complete Todo Items

  Background: Setup item and navigate to ToDo app
    Given the app has loaded

  @smoke
  Scenario: Mark completed item as incomplete
    Given the app has item "Buy milk" marked as complete
    When I click the checkbox next to "Buy milk"
    Then "Buy milk" is marked as incomplete
    And the strike-through styling is removed
    And the counter displays "1 item left"
