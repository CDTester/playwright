# Auto-generated from playwrightDemo\Todo\AI\edit-enter.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Edit
Feature: Edit Todo Items

  Background: Setup item and navigate to ToDo app
    Given the app has loaded with an item

  @smoke
  Scenario: Edit todo item and save via Enter
    Given the app has item "Buy milk"
    When I double-click on "Buy milk" to enter edit mode
    And I clear the text and type "Buy cheese"
    And I press Enter to save
    Then the item is updated to "Buy cheese"
    And edit mode is exited
    And the updated item is visible in the list
