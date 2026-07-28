# Auto-generated from playwrightDemo\Todo\AI\keyboard-tab.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Accessibility
Feature: Keyboard Navigation and Accessibility

  Background: Setup item and navigate to ToDo app
    Given the app has loaded with an item

  @regression
  Scenario: Navigate through interactive elements with Tab key
    Given the ToDo app has loaded with an item "Buy milk"
    When I press Tab to navigate to the mark all complete checkbox
    And I continue pressing Tab through all interactive elements
    Then all interactive elements are reachable
    And Tab order is logical
