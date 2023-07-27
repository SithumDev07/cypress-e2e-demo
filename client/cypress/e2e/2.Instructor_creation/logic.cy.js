/* eslint-disable no-undef */
/// <reference types="cypress" />
import Chance from "chance";
import 'cypress-xpath';

const chance = new Chance();


describe("Instructor Creation", () => {
    
    beforeEach(() => {
        cy.loginCommand("admin@gmail.com", "ASas!@12");
        cy.get('[href="/register/instructor"] > .MuiButtonBase-root').as("CreateInstructorButton");
        cy.get("@CreateInstructorButton").click();
    })

    //Todo:Dilini
    describe("Select Subject", () => {
        it('should open and blur the Subject type dropdown', () => {
                // Get the input field for selecting the examination level and give it an alias
                cy.get('[placeholder="Select examination level"]').as('levelAutocomplete');
    
                cy.get('@levelAutocomplete').click();
    
                cy.get('@levelAutocomplete').blur();
    
                cy.get('@levelAutocomplete').click();
    
                // Assert that there are options in the dropdown (more than 0)
                cy.get('[role="option"]').should('have.length.above', 0);

                // Optionally, you can also check the total number of options in the dropdown
                 cy.get('[role="option"]').should("have.length", 12);
    
                 // Click on the first option in the dropdown
                cy.get('[role="option"]').first().click();

                // After selecting the first item, you can ensure that the selected item is 'Mathematics'
                cy.get("@levelAutocomplete").should("have.value", "Mathematics");
    
            }
        )
    })

    //Todo:Dilini
    describe("Password and Confirm Password Test", () => {
        it("should not submit the form if passwords do not match", () => {

          // Get the input fields for password and confirm password and give them aliases
          cy.get('[placeholder="Enter password"]').as('password');
          cy.get('[placeholder="Enter password again"]').as('ConfirmPassword');

          // Type different passwords in password and confirm password fields
          cy.get("@password").type("securePassword");
          cy.get("@ConfirmPassword").type("differentPassword");

          
          cy.get("button[type='submit']").click();
      
          // Assert that the form is not submitted
          cy.url().should("eq", Cypress.config().href="http://localhost:3000/register/instructor"); // Assert that the URL remains the same
          // Add more assertions here, if necessary
        });
      });

       // Other test cases for password strength validation
      it("should validate a strong password", () => {
        const strongPassword = "SecureP@ss1";
        cy.isStrongPassword(strongPassword).should("be.true");
      });
    
      it("should reject a password without an uppercase letter", () => {
        const weakPassword = "weakpassword1@";
        cy.isStrongPassword(weakPassword).should("be.false");
      });
    
      it("should reject a password without a lowercase letter", () => {
        const weakPassword = "WEAKPASSWORD1@";
        cy.isStrongPassword(weakPassword).should("be.false");
      });
    
      it("should reject a password without a digit", () => {
        const weakPassword = "WeakPassword@";
        cy.isStrongPassword(weakPassword).should("be.false");
      });
    
      it("should reject a password without a special symbol", () => {
        const weakPassword = "WeakPassword1";
        cy.isStrongPassword(weakPassword).should("be.false");
      });
    
      it("should reject a password that is too short", () => {
        const shortPassword = "ShrtP@1";
        cy.isStrongPassword(shortPassword).should("be.false");
      }); 
});


