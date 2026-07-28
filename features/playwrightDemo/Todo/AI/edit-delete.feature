# Auto-generated from playwrightDemo\Todo\AI\edit-delete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Edit
Feature: Edit Todo Items

  Background: Setup item and navigate to ToDo app
    Given the app has loaded with an item

  @regression
  Scenario: Delete item by saving empty edit
    Given the app has item "Buy milk"
    When I double-click on "Buy milk" to enter edit mode
    And I clear all text
    And I press Enter to save
    Then the item is removed from the list
    And the counter displays "0 items left"
