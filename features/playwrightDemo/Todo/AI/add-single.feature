# Auto-generated from playwrightDemo\Todo\AI\add-single.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @smoke
  Scenario: Add a single todo item
    Given the list is empty
    When I enter "Buy milk" in the input field
    And I press Enter to submit the item
    Then the item "Buy milk" appears in the list
    And the input field is cleared
    And the counter displays "1 item left"
