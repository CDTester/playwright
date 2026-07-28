# Auto-generated from playwrightDemo\Todo\AI\footer-display.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @UI
Feature: User Interface and Navigation

  @regression
  Scenario: Footer displays helpful information
    Given I navigate to the ToDo app
    Then the footer displays "Double-click to edit a todo"
    And the footer displays creator information
    And the footer contains a link to TodoMVC
