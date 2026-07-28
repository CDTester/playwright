# Auto-generated from Login\herokuappLogin.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@login @selenium @noStorageState
Feature: The-internet.herokuapp Login Page Tests

  # TMS: LOGIN-011
  # Bug: BUG-111
  # Severity: BLOCKER
  @smoke
  Scenario: Cannot access secure area without login
    Given the user is not logged in
    When the user naviagates to the secure page
    Then the user is redirected to the login page
    And the user is presented with message to login

  # TMS: LOGIN-012
  # Bug: BUG-112
  # Severity: CRITICAL
  @smoke
  Scenario: Can access secure area with valid login
    Given the user is not logged in
    And the user naviagates to the login page
    When the user logs in with valid credentials
    Then the user is redirected to the secure page
    And the user is presented with message to login

  # TMS: LOGIN-013
  # Bug: BUG-113
  # Severity: NORMAL
  @regression
  Scenario: The user is redirected to the login page after logging out
    Given the user is logged in
    When the user clicks logout
    Then the user is redirected to the login page
    And the user is presented with message of being logged out
