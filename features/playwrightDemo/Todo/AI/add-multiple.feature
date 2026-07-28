# Auto-generated from playwrightDemo\Todo\AI\add-multiple.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Add
Feature: Add Todo Items

  Background: Navigate to ToDo app
    Given the app has loaded

  @smoke
  Scenario: Add multiple todo items
    Given the list is empty
    When I add "${items[i]}" and press Enter
    Then all items appear in the list in order
    And the counter displays "3 items left"
