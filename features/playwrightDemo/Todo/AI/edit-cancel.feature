# Auto-generated from playwrightDemo\Todo\AI\edit-cancel.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Edit
Feature: Edit Todo Items

  Background: Setup item and navigate to ToDo app
    Given the app has loaded with an item

  @smoke
  Scenario: Cancel edit with Escape key
    Given the app has item "Buy milk"
    When I double-click on "Buy milk" to enter edit mode
    And I type different text "Buy cheese"
    And I press Escape key
    Then edit mode is cancelled
    And the item still displays "Buy milk"
    And no changes are saved
