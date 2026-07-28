# Auto-generated from playwrightDemo\Todo\AI\counter-singular.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Counter
Feature: Counter Display

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Counter displays singular for one active item
    When I add one item "Buy milk"
    Then the counter text displays "1 item left" (singular)
