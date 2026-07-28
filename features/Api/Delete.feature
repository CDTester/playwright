# Auto-generated from Api\Delete.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @posts @delete
Feature: Posts API

  # TMS: USER-011
  # Bug: BUG-011
  # Severity: NORMAL
  @smoke
  Scenario: DELETE an existing post
    Given the posts API can be connected to
    When a request is made to delete an existing post
    Then the response code should be 200
