# Auto-generated from websockets\websocketTester.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@websocket
Feature: Websockets Page Tests

  # TMS: SOCK-001
  # Bug: BUG-201
  # Severity: BLOCKER
  @smoke
  Scenario: intercept websocket messages
    Given Navigate to the websocket tester page
    And Connect to the WebSocket tester
    And Send a message on the websocket
    And Websocket should have sent the message
    And Websocket should have received the message
    And Disconnect from the WebSocket
