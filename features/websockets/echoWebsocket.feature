# Auto-generated from websockets\echoWebsocket.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@websocket
Feature: Websockets Page Tests

  # TMS: SOCK-002
  # Bug: BUG-202
  # Severity: BLOCKER
  @smoke
  Scenario: Send websocket messages via UI
    Given I navigate to the websocket tester page
    And I pause messaging
    When I send a message on the websocket
    Then the displayed messages should contain the sent message

  # TMS: SOCK-003
  # Bug: BUG-203
  # Severity: BLOCKER
  @regression
  Scenario: Mock websocket response messages
    Given I navigate to the websocket tester page
    And I pause messaging
    When I send a message on the websocket
    Then the displayed messages should contain the sent message

  # TMS: SOCK-004
  # Bug: BUG-204
  # Severity: BLOCKER
  @regression
  Scenario: Intercept websocket response messages
    Given I navigate to the websocket tester page
    And I pause messaging
    When I send a message on the websocket to be intercepted
    And I send a message on the websocket not to be intercepted
    Then the displayed messages should contain the sent message
