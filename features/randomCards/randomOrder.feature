# Auto-generated from randomCards\randomOrder.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@random
Feature: Random order Cards Tests

  # TMS: RAND-001
  # Bug: BUG-501
  # Severity: CRITICAL
  @smoke
  Scenario: Wait for all product cards to be displayed
    Given I navigate to the Random Order page
    When the header is displayed
    Then all the product cards should be displayed in a random timing

  # TMS: RAND-002
  # Bug: BUG-502
  # Severity: NORMAL
  @regression
  Scenario: Get the random pice for a monitor
    Given I navigate to the Random Order page
    When the product card for monitor is displayed
    Then get the random price

  # TMS: RAND-003
  # Bug: BUG-503
  # Severity: MINOR
  @regression
  Scenario: Add Printer to the basket
    Given I navigate to the Random Order page
    And the product card for printer is displayed
    And there are no items in the basket
    When the Add to Basket button is clicked
    Then the number of items in basket increments
