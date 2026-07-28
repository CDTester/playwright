# Auto-generated from playwrightDemo\Todo\AI\filter-completed.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Filter
Feature: Filter Todo Items

  Background: Setup items with mixed states and navigate to ToDo app
    Given the app has loaded with mixed items

  @smoke
  Scenario: Filter to show only completed items
    Given items with mixed completion states
    When I click the "Completed" filter
    Then only completed items ("Buy milk") are displayed
    And active items are not visible
    And the "Completed" filter link is highlighted
