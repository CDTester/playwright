# Auto-generated from playwrightDemo\Todo\AI\add-whitespace.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Whitespace-only item should not be added
    Given the list is empty
    When I enter only whitespace characters
    And I press Enter
    Then no item is added to the list
    And the input field is cleared
