# Auto-generated from Api\Patch.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @posts @patch
Feature: Posts API

  # TMS: USER-010
  # Bug: BUG-010
  # Severity: NORMAL
  @smoke
  Scenario: PATCH an existing post
    Given the posts API can be connected to
    When a request is made to patch an existing post
    Then the response code should be 200
    And the response body contains the updated data
