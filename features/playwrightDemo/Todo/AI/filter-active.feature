# Auto-generated from playwrightDemo\Todo\AI\filter-active.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Filter
Feature: Filter Todo Items

  Background: Setup items with mixed states and navigate to ToDo app
    Given the app has loaded with mixed items

  @smoke
  Scenario: Filter to show only active items
    Given items with mixed completion states
    When I click the "Active" filter
    Then only active items ("Walk the dog" and "Read a book") are displayed
    And completed items are not visible
    And the "Active" filter link is highlighted
