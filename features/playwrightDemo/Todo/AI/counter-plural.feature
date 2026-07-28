# Auto-generated from playwrightDemo\Todo\AI\counter-plural.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Counter
Feature: Counter Display

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Counter displays plural for multiple active items
    When I add item "Buy milk"
    And I add item "Walk the dog"
    Then the counter text displays "2 items left" (plural)
