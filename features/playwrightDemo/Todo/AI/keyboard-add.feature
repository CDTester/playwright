# Auto-generated from playwrightDemo\Todo\AI\keyboard-add.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Accessibility
Feature: Keyboard Navigation and Accessibility

  @smoke
  Scenario: Add item using keyboard only
    Given the ToDo app has loaded and the input field is focused
    When I type "Buy milk" without using the mouse
    And I press Enter
    Then the item is added to the list
    And focus returns to the input field
    And I can immediately type another item
