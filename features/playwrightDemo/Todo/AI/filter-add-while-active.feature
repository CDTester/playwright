# Auto-generated from playwrightDemo\Todo\AI\filter-add-while-active.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Filter
Feature: Filter Todo Items

  Background: Setup items and navigate to ToDo app
    Given the app has loaded with items

  @regression
  Scenario: Add item while on Active filter view
    Given the Active filter is displayed with 1 active item
    When I add new item "Read a book"
    Then the new item is immediately visible in the filtered list
    And other active items are still visible
