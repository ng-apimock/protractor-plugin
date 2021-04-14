@select-preset
Feature: Select preset

  Developers must be able to:

  - Select a preset to set a preferred state

  Background:
    Given the following mocks state:
      | name              | scenario |
      | get repositories  | ok       |
      | create repository | ok       |
      | readme            | ok       |
    And the following variables state:
      | key | value |

  # When selecting a preset the following things will be tested:
  # - select scenario
  # - set variable
  Scenario: Select a preset
    Given I open the page
    When I select the preset happy
    Then the following mocks state:
      | name              | scenario     |
      | get repositories  | dummy        |
      | create repository | unauthorized |
    And the following variables state:
      | key               | value             |
      | dummy-description | dummy description |
