# Auto-generated from Api\Post.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @posts @post
Feature: Posts API

  # TMS: USER-008
  # Bug: BUG-008
  # Severity: NORMAL
  @smoke
  Scenario: POST a new post
    Given the posts API can be connected to
    When a request is made to create a new post
    Then the response code should be 201
    And the response body contains the posted data
