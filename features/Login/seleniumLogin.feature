# Auto-generated from Login\seleniumLogin.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@login @selenium @noStorageState
Feature: Selenium Login Page Tests

  Background
    Given ${login.url} has loaded
      Given ${login.url} has loaded

  # TMS: LOGIN-001
  # Bug: BUG-101
  # Severity: BLOCKER
  @smoke
  Scenario: Login with valid credentials
    Given user has valid credential
      Given user has valid credential
    When the user logs in
      When the user logs in
    Then a successful login message is presented
      Then a successful login message is presented

  # TMS: LOGIN-002
  # Bug: BUG-102
  # Severity: CRITICAL
  @regression
  Scenario: Login with invalid credentials
    Given user has invalid credential
      Given user has invalid credential
    When the user logs in
      When the user logs in
    Then an error login message is presented
      Then an error login message is presented
