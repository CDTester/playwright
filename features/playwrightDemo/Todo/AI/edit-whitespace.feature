# Auto-generated from playwrightDemo\Todo\AI\edit-whitespace.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Edit
Feature: Edit Todo Items

  Background: Setup item and navigate to ToDo app
    Given the app has loaded with an item

  @regression
  Scenario: Whitespace is trimmed when editing item
    Given the app has item "Buy milk"
    When I double-click on "Buy milk" to enter edit mode
    And I enter "  Buy cheese  " with leading and trailing spaces
    And I press Enter to save
    Then the item displays "Buy cheese" without extra spaces
    And the item is saved successfully
