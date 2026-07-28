# Auto-generated from playwrightDemo\Todo\AI\counter-tracking.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Counter
Feature: Counter Display

  Background: Navigate to ToDo app
    Given the app has loaded

  @smoke
  Scenario: Counter correctly tracks active items
    Then the counter displays "0 items left" initially
    When I add item "Buy milk"
    Then the counter displays "1 item left"
    When I add item "Walk the dog"
    Then the counter displays "2 items left"
    When I mark "Buy milk" as complete
    Then the counter displays "1 item left"
