# Auto-generated from playwrightDemo\Todo\AI\app-load.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @UI
Feature: User Interface and Navigation

  @smoke
  Scenario: App loads with correct title and heading
    Given I navigate to https://demo.playwright.dev/todomvc/#/
    Then the page title is "React • TodoMVC"
    And the main heading displays "todos"
    And the input field placeholder reads "What needs to be done?"
