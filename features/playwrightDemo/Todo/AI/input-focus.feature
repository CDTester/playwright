# Auto-generated from playwrightDemo\Todo\AI\input-focus.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @UI
Feature: User Interface and Navigation

  @smoke
  Scenario: Input field is focused on page load
    Given I navigate to the ToDo app
    Then the input field "What needs to be done?" is focused
    And I can start typing without clicking
