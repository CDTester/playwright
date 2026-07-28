# Auto-generated from playwrightDemo\Todo\AI\mark-all-complete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Complete
Feature: Complete Todo Items

  Background: Setup items and navigate to ToDo app
    Given the app has loaded with items

  @smoke
  Scenario: Mark all items as complete
    Given the app has items "Buy milk", "Walk the dog", and "Read a book"
    When I click the "Mark all as complete" checkbox
    Then all items are marked as complete
    And all items are displayed with strike-through styling
    And the counter displays "0 items left"
