# Auto-generated from playwrightDemo\Todo\AI\persistence-empty.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Persistence
Feature: Persistence and LocalStorage

  Background: Navigate to ToDo app
    Given the app has loaded

  @regression
  Scenario: Empty list persists after page reload
    When I reload the page
    Then the list remains empty
    And the counter displays "0 items left"
