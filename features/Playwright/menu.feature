# Auto-generated from Playwright\menu.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@Playwright @Menu
Feature: Playwright Menu

  Background: Navigate to Playwright Homepage
    Given ${homePage.url} has loaded

  # TMS: PLAY-011
  # Bug: BUG-011
  # Severity: BLOCKER
  @smoke
  Scenario: Menu (Large screen) should have homepage link to 'Playwright'
    Then there should be a link to "Playwright" for Node.js

  # TMS: PLAY-012
  # Bug: BUG-012
  # Severity: CRITICAL
  @smoke
  Scenario: Menu (Large screen) should have link for 'Docs'
    Then there should be a link to "Docs"

  # TMS: PLAY-013
  # Bug: BUG-013
  # Severity: NORMAL
  @smoke
  Scenario: Menu (Large screen) should have link for 'API'
    Then there should be a link to "API"

  # TMS: PLAY-014
  # Bug: BUG-014
  # Severity: MINOR
  @smoke
  Scenario: Menu (Large screen) should have link for 'Node.js'
    Then there should be a link to "Node.js"

  # TMS: PLAY-015
  # Bug: BUG-015
  # Severity: MINOR
  @smoke
  Scenario: Menu (Large screen) should have drop down menu for other languages
    And the dropdown menu for other languages is not shown
    When you hover over the languages menu
    Then it Should reveal dropdown menu for other languages

  # TMS: PLAY-017
  # Bug: BUG-017
  # Severity: NORMAL
  @smoke
  Scenario: Menu (Large screen) should change menu links when python language is selected
    When the language is changed to Python
    Then it should have homepage link to "Playwright for Python"
    And have 'Docs' link to Python docs
    And have 'API' link to Python API docs

  # TMS: PLAY-018
  # Bug: BUG-018
  # Severity: NORMAL
  @smoke
  Scenario: Menu (Large screen) should change menu links when Java language is selected
    When the language is changed to Java
    Then it should have homepage link to "Playwright for Java"
    And have 'Docs' link to Java docs
    And have 'API' link to Java API docs

  # TMS: PLAY-019
  # Bug: BUG-019
  # Severity: NORMAL
  @smoke
  Scenario: Menu (Large screen) should change menu links when .NET language is selected
    When the language is changed to .NET
    Then it should have homepage link to "Playwright for .NET"
    And have 'Docs' link to .NET docs
    And have 'API' link to .NET API docs

  # TMS: PLAY-020
  # Bug: BUG-020
  # Severity: CRITICAL
  @regression
  Scenario: Menu (Small screen) should have homepage link to 'Playwright'
    Then it should have link to "Playwright"

  # TMS: PLAY-021
  # Bug: BUG-021
  # Severity: NORMAL
  @regression
  Scenario: Menu (Small screen) should have link for 'Docs'
    And the link to "Docs" is not visible when menu is closed
    When the menu icon is clicked to open the menu
    Then it should have link to "Docs"

  # TMS: PLAY-022
  # Bug: BUG-022
  # Severity: NORMAL
  @regression
  Scenario: Menu (Small screen) should have link for 'API'
    And the link to "API" is not visible when menu is closed
    When the menu icon is clicked to open the menu
    Then it should have link to "API"

  # TMS: PLAY-023
  # Bug: BUG-023
  # Severity: MINOR
  @regression
  Scenario: Menu (Small screen) should have link for 'Node.js'
    And the link to "Node.js" is not shown when menu is closed
    When the menu icon is clicked to open the menu
    Then it should have link to "Node.js"

  # TMS: PLAY-024
  # Bug: BUG-024
  # Severity: MINOR
  @regression
  Scenario: Menu (Small screen) should have drop down menu for other languages
    And the link to "Node.js" is not shown when menu is closed
    And the menu icon is clicked to open the menu
    And it should not show dropdown menu for other languages
    When the menu for other languages is clicked
    Then it should reveal dropdown menu for other languages

  # TMS: PLAY-026
  # Bug: BUG-026
  # Severity: NORMAL
  @regression
  Scenario: Menu (Small screen) should change menu links when python language is selected
    When the language is changed to Python
    Then it should have homepage link to "Playwright for Python"
    And it should have 'Docs' link to Python docs
    And it should have 'API' link to Python API docs

  # TMS: PLAY-027
  # Bug: BUG-027
  # Severity: NORMAL
  @regression
  Scenario: Menu (Small screen) should change menu links when Java language is selected
    When the language is changed to Java
    Then it should have homepage link to "Playwright for Java"
    And it should have 'Docs' link to Java docs
    And it should have 'API' link to Java API docs

  # TMS: PLAY-028
  # Bug: BUG-028
  # Severity: TRIVIAL
  @regression
  Scenario: Menu (Small screen) should change menu links when .NET language is selected
    When the language is chnaged to .NET
    Then it should have homepage link to "Playwright for .NET"
    And it should have 'Docs' link to .NET docs
    And it should have 'API' link to .NET API docs
