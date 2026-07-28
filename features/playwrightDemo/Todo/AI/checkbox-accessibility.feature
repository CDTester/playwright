# Auto-generated from playwrightDemo\Todo\AI\checkbox-accessibility.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Accessibility
Feature: Keyboard Navigation and Accessibility

  Background: Setup item and navigate to ToDo app
    Given the app has loaded with an item

  @regression
  Scenario: Checkboxes have proper accessibility attributes
    Given the ToDo app has loaded with item "Buy milk"
    Then the checkbox has accessible label
    When I use keyboard to navigate to the checkbox
    And I press Space to toggle it
    Then the checkbox state changes
    And the state is properly indicated
