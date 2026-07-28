# Auto-generated from Api\Put.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @posts @put
Feature: Posts API

  # TMS: USER-009
  # Bug: BUG-009
  # Severity: NORMAL
  @smoke
  Scenario: PUT an existing post
    Given the posts API can be connected to
    When a request is made to update an existing post
    Then the response code should be 200
    And the response body contains the updated data
