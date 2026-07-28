# Auto-generated from playwrightDemo\Todo\AI\delete-item.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Delete
Feature: Delete Todo Items

  Background: Setup items and navigate to ToDo app
    Given the app has loaded with items

  @smoke
  Scenario: Delete a todo item
    Given the app has items "Buy milk" and "Walk the dog"
    When I hover over "Buy milk"
    And I click the delete button (×) for "Buy milk"
    Then "Buy milk" is removed from the list
    And "Walk the dog" is still in the list
    And the counter displays "1 item left"
