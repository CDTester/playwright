# Auto-generated from Api\SchemaValidation.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @users
Feature: Users API

  # TMS: USER-005
  # Bug: BUG-005
  # Severity: NORMAL
  @smoke @schema
  Scenario: Validate User JSON schema
    Given the users API can be connected to
    When a request is made to get all users
    Then the JSON schema should be valid
