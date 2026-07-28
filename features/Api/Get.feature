# Auto-generated from Api\Get.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@api @users @get
Feature: User API

  # TMS: USER-001
  # Bug: BUG-001
  # Severity: NORMAL
  @smoke
  Scenario: Get all users
    Given the users API can be connected to
    When a request is made to get all users
    Then the response code should be 200
    And the response body is not empty

  # TMS: USER-002
  # Bug: BUG-002
  # Severity: NORMAL
  @smoke
  Scenario: Get user by id
    Given the users API can be connected to
    When a request is made to get a user by id
    Then the response code should be 200
    And the response body should contain details of the user

  # TMS: USER-003
  # Bug: BUG-003
  # Severity: NORMAL
  @smoke
  Scenario: Get user by username
    Given the users API can be connected to
    When a request is made to get a user by username
    Then the response code should be 200
    And the response body should contain details of the user

  # TMS: USER-004
  # Bug: BUG-004
  # Severity: NORMAL
  @smoke
  Scenario: Get user by city
    Given the users API can be connected to
    When a request is made to get a user by city
    Then the response code should be 200
    And the response body should contain details of the user
