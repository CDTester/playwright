# Auto-generated from Api\Auth.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @auth
Feature: Postman API

  # TMS: USER-007
  # Bug: BUG-007
  # Severity: NORMAL
  @smoke @x-api-key
  Scenario: User gets 401 response with invalid X-API-Key token
    Given the postman API can be connected to
    When a request is made to get user with an invalid X-API-Key token
    Then the user will receive a 401 Unauthorized response
