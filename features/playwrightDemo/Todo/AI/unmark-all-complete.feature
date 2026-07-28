# Auto-generated from playwrightDemo\Todo\AI\unmark-all-complete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Complete
Feature: Complete Todo Items

  Background: Setup items and navigate to ToDo app
    Given the app has loaded with completed items

  @smoke
  Scenario: Unmark all items when all are complete
    Given all items are marked as complete
    When I click the "Mark all as complete" checkbox
    Then all items are marked as incomplete
    And the strike-through styling is removed from all items
    And the counter displays "3 items left"
