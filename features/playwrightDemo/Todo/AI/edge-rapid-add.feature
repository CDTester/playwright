# Auto-generated from playwrightDemo\Todo\AI\edge-rapid-add.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @EdgeCase
Feature: Edge Cases and Error Handling

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Handle rapid consecutive item additions
    Given the ToDo app has loaded
    When I rapidly add 10 items in quick succession
    Then all 10 items are added in order
    And the counter displays "10 items left"
    And no items are skipped or lost
