# Auto-generated from playwrightDemo\Todo\AI\delete-completed.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Todo @Delete
Feature: Delete Todo Items

  Background: Setup completed item and navigate to ToDo app
    Given the app has loaded with a completed item

  @regression
  Scenario: Delete a completed item
    Given the app has item "Buy milk" marked as complete
    When I click the delete button (×) for "Buy milk"
    Then "Buy milk" is removed from the list
    And the counter displays "0 items left"
