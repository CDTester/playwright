# Auto-generated from Playwright\homepage.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Playwright @Homepage
Feature: Playwright Homepage

  Background: Navigate to Playwright Homepage
    Given ${homePage.url} has loaded

  # TMS: PLAY-001
  # Bug: BUG-001
  # Severity: BLOCKER
  @smoke
  Scenario: Homepage should have correct page Title
    Given Should have the correct page title

  # TMS: PLAY-002
  # Bug: BUG-002
  # Severity: CRITICAL
  @regression
  Scenario: Homepage should have Navigation Menu
    Given Should have top navigation menu

  # TMS: PLAY-003
  # Bug: BUG-003
  # Severity: NORMAL
  @regression
  Scenario: Homepage should have a Header section
    Given Should have a banner section
    And Should have top heading text
    And Should have link to 'GET STARTED'
    And Should have links to GitHub

  # TMS: PLAY-004
  # Bug: BUG-004
  # Severity: NORMAL
  @regression
  Scenario: Homepage should have a Footer section
    Given Should have a footer section
    And Should have "Getting started" link in footer
