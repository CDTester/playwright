# Auto-generated from playwrightDemo\Todo\AI\add-empty.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Empty item should not be added
    Given the list is empty
    When I leave the input field empty
    And I press Enter
    Then no item is added to the list
    And the counter displays "0 items left"
