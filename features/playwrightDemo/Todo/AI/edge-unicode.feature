# Auto-generated from playwrightDemo\Todo\AI\edge-unicode.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @EdgeCase
Feature: Edge Cases and Error Handling

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Handle items with Unicode and emoji characters
    Given the ToDo app has loaded
    When I add item "🛒 Buy milk"
    Then the emoji displays correctly
    When I add item with Chinese characters "購牛奶"
    Then all Unicode characters are displayed correctly
