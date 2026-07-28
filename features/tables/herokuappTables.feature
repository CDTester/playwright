# Auto-generated from tables\herokuappTables.spec.ts — do not edit by hand.
# Regenerate with generate-features.js after changing the tests.

@tables
Feature: The-internet.herokuapp Challenging DOM Page Tests

  # TMS: TABLE-001
  # Bug: BUG-701
  # Severity: BLOCKER
  @smoke
  Scenario: Confirm table headers and verify data in table cells
    Given the challenging DOM page has loaded
    When the table is visible
    Then the table must have column headers
    And there are 10 rows
    And verify the data in row 5
    And you can find a row based on one or many column values
    And you can get the row index by a value from a specific column
    And you can get the values of a cell by column and row index
    And you can get all the values in a column

  # TMS: TABLE-002
  # Bug: BUG-702
  # Severity: CRITICAL
  @regression
  Scenario: Can edit a row
    Given the challenging DOM page has loaded
    When table is visible
    Then the edit row link can be clicked

  # TMS: TABLE-003
  # Bug: BUG-703
  # Severity: NORMAL
  @regression
  Scenario: Can delete a row
    Given the challenging DOM page has loaded
    When table is visible
    Then the delete row link can be clicked
