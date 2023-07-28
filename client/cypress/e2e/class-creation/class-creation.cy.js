/* eslint-disable no-undef */
/// <reference types="cypress" />

import Chance from "chance";

const chance = new Chance();

describe("Create class", () => {
  beforeEach(() => {
    cy.loginCommand("admin@gmail.com", "ASas!@12");
    cy.get('[href="/class/create"] > .MuiButtonBase-root').as(
      "CreateClassButton"
    );
    cy.get("@CreateClassButton").click();
  });

  describe("Accessing create class page", () => {
    // TODO:
    it("should navigate to create class page for authorized users", () => {});

    // TODO:
    it("should not navigate to create class page for unauthorized users", () => {});
  });

  // TODO: Sithum
  describe("Select instructor", () => {
    beforeEach(() => {
      cy.get(
        ":nth-child(1) > .MuiAutocomplete-root > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root"
      ).as("InstructorDropDown");
    });

    it("should navigate to the create class page", () => {
      cy.url().should("include", "create");
      cy.url().should("include", "class");
    });

    it("should fetch all the instructors", () => {
      cy.intercept("GET", "http://localhost:4000/akura/instructor").as(
        "FetchAllInstructors"
      );

      cy.GetAllInstructors();

      // TODO:

      // cy.wait("@FetchAllInstructors").then((response) => {
      //     cy.log(response);
      //     expect(response.response.statusCode).eq(200);
      // });
    });

    it("should empty by default", () => {
      cy.get("@InstructorDropDown").should("have.value", "");
    });

    it("should display same number of instructors receiving from the API", () => {
      cy.get("@InstructorDropDown").click();

      cy.get(".MuiAutocomplete-option").then((el) => {
        cy.GetAllInstructors().then((instructors) => {
          cy.get(".MuiAutocomplete-option").should(
            "have.length",
            instructors.length
          );
        });
      });
    });

    it("should display the instructors receiving from the API", () => {
      cy.get("@InstructorDropDown").click();

      cy.get(".MuiAutocomplete-option").then((el) => {
        cy.GetAllInstructors().then((instructors) => {
          for (let i = 0; i < el.length; i++) {
            expect(`${el[i].innerText.toString().trim()}`).to.eq(
              instructors[i].toString().trim()
            );
          }
        });
      });
    });

    it.only('should filter instructors by query', () => {
        cy.get("@InstructorDropDown").type("Rod");
        cy.get("@InstructorDropDown").click();
        cy.get(".MuiAutocomplete-option").should("have.length", 1);
    });
  });

  // TODO: Malithi
  describe("Select Class Type", () => {
    it("should open and blur the class type dropdown", () => {
      cy.get('[placeholder="Select class type"]').as("classAutocomplete");

      cy.get("@classAutocomplete").click();

      cy.get("@classAutocomplete").blur();

      cy.get("@classAutocomplete").click();

      // TODO: Test case for dropdown options should have a separate test case (not inside this test case)

      cy.get('[role="option"]').should("have.length.above", 0); // TODO: Since there are only two options to choose from. We can specify the length as 2.

      //click the first option

      cy.get('[role="option"]').first().click(); // TODO: After selecting the first item, we can ensure that selected item is 'Group Class'
    });
  });

  //TODO : Sandamini
  describe("Select Hall", () => {
    it("should open and blur the hall dropdown", () => {
      cy.get('[placeholder="Select hall"]').as("hallAutocomplete");

      cy.get("@hallAutocomplete").click();

      cy.get("@hallAutocomplete").blur();

      cy.get("@hallAutocomplete").click();

      // TODO: Test case for dropdown options should have a separate test case (not inside this test case)

      cy.get('[role="option"]').should("have.length.above", 0); // TODO: Since there are only two options to choose from. We can specify the length as 2.

      // Optionally, you can also check the total number of options in the dropdown
      cy.get('[role="option"]').should("have.length", 3);

      //click the first option

      cy.get('[role="option"]').first().click(); // TODO: After selecting the first item, we can ensure that selected item is 'Group Class'

      // After selecting the first item, you can ensure that the selected item is 'Hall A'
      cy.get("@hallAutocomplete").should("have.value", "Hall A");
    });

    it("should verify all the halls are included", () => {
      cy.get('[placeholder="Select hall"]').as("hallAutocomplete");

      cy.get("@hallAutocomplete").click();

      // Check if "Hall A," "Hall B," and "Hall C" are present in the dropdown
      cy.get('[role="option"]').should("contain.text", "Hall A");

      cy.get('[role="option"]').should("contain.text", "Hall B");

      cy.get('[role="option"]').should("contain.text", "Hall C");
    });
  });
  // TODO: Sithum
  describe("Select date", () => {});
});
