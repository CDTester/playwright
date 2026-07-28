# Auto-generated from Api\Auth.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @auth
Feature: Bitly API

  # TMS: USER-006
  # Bug: BUG-006
  # Severity: NORMAL
  @smoke @bearer
  Scenario: User gets 403 response with invalid Bearer token
    Given the bitly API can be connected to
    When a request is made to get user with an invalid Bearer token
    Then the user will receive a 403 forbidden response
