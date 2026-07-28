# Auto-generated from playwrightDemo\Todo\AI\add-long-text.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Add item with very long text
    Given the list is empty
    When I enter a long text item (100+ characters)
    Then the long item is added and fully displayed
    And the counter displays "1 item left"
