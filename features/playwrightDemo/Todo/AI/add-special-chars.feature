# Auto-generated from playwrightDemo\Todo\AI\add-special-chars.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Add item with special characters
    Given the list is empty
    When I enter "Buy milk @$#%!" with special characters
    Then the item appears with special characters preserved
    And the counter displays "1 item left"
