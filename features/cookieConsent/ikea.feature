# Auto-generated from cookieConsent\ikea.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@cookie
Feature: Cookie Consent Tests

  # TMS: COOK-001
  # Bug: BUG-401
  # Severity: CRITICAL
  @smoke
  Scenario: Reject Cookie Consent when displayed
    Given I navigate to the Ikea homepage
    When the cookie consent is displayed
    Then the locator handler in the goto function rejects the cookie consent
