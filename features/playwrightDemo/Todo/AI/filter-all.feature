# Auto-generated from playwrightDemo\Todo\AI\filter-all.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Filter
Feature: Filter Todo Items

  Background: Setup items with mixed states and navigate to ToDo app
    Given the app has loaded with mixed items

  @smoke
  Scenario: Filter to show all items
    Given items with mixed completion states
    When I click the "All" filter
    Then all items (active and completed) are displayed
    And the "All" filter link is highlighted
