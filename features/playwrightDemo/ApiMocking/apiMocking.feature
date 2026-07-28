# Auto-generated from playwrightDemo\ApiMocking\apiMocking.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@apiMocking
Feature: API Mocking Page Tests

  # TMS: MOCK-001
  # Bug: BUG-301
  # Severity: BLOCKER
  @smoke
  Scenario: Mock the API response for the fruits endpoint
    Given a mocked API response is loaded
    When I navigate to the API mocking page
    Then I should see the mocked API response
