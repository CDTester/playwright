# Auto-generated from Login\herokuappLogin.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@login @selenium @noStorageState
Feature: The-internet.herokuapp Login Page Tests

  # TMS: LOGIN-014
  # Bug: BUG-114
  # Severity: MINOR
  @smoke
  Scenario: The user can access the secure page when storage state is used
    Given the user is logged in via a saved session state
    When the user goes to the secure page
    Then the user is not redirected to the login page
    And the user is not presented with logged in message

  # TMS: LOGIN-015
  # Bug: BUG-115
  # Severity: MINOR
  @smoke
  Scenario: Re-run storage state test to check it runs faster as storagestate now saved
    Given the user is logged in via a saved session state
    When the user goes to the secure page
    Then the user is not redirected to the login page
    And the user is not presented with logged in message
