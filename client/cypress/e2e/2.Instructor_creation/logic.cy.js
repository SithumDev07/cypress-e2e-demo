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
        // Other test cases for password strength validation
       
        it("should reject a weak password and clear the fields", () => {
          const weakPasswords = [
            "weakpassword1@", // Missing uppercase
            "WEAKPASSWORD1@", // Missing lowercase
            "weakpasswordone", // Missing digit
            "WeakPassword1", // Missing special symbol
            "ShrtP@1", // Too short
            "Password@1", // Missing uppercase and digit
            "Password1@", // Missing lowercase and special symbol
            "PASSWORD1@" // Missing lowercase and digit
          ];
          
          cy.wrap(weakPasswords).each((weakPassword) => {
            cy.get('[placeholder="Enter password"]').as('password').type(weakPassword);
            cy.get('[placeholder="Enter password again"]').as('confirmPassword').type(weakPassword);
            
            cy.isStrongPassword(weakPassword).then((isStrong) => {
              if (!isStrong) {
                cy.get('@password').clear();
                cy.get('@confirmPassword').clear();
              }
            });
          });
        });
      
        //Check the strong password
        it("should accept a strong password", () => {
          const strongPassword = "SecureP@ss1";
          
          cy.get('[placeholder="Enter password"]').as('password').type(strongPassword);
          cy.get('[placeholder="Enter password again"]').as('confirmPassword').type(strongPassword);
          
          cy.isStrongPassword(strongPassword).should("be.true");
        });
      });
     
//     //Todo:Dilini
    describe('NIC Validation', () => {
      const regexp1 = /^[0-9]{9}[VX]|[0-9]{12}$/;
      const regexp2 = /^([0-9]{2}([0-3]{1}|[5-8]{1})[0-9]{6}[VX])|([0-9]{12})$/;
    
      it('should validate the NIC entered in the input field', () => {
         // Enter an invalid NIC
         cy.get('[placeholder="Enter NIC number"]').as('nic').type('12345678V');
         cy.get('@nic').should('have.value', '12345678V');
         cy.get('@nic').invoke('val').should('not.match', regexp1);
         cy.get('@nic').invoke('val').should('not.match', regexp2);

        // Enter a valid NIC that matches regexp1
        cy.get('@nic').clear().type('123456789V');
        cy.get('@nic').should('have.value', '123456789V');
        cy.get('@nic').invoke('val').should('match', regexp1);
    
        // Enter another valid NIC that matches regexp1
        cy.get('@nic').clear().type('123456789123');
        cy.get('@nic').should('have.value', '123456789123');
        cy.get('@nic').invoke('val').should('match', regexp1);
    
        // Enter a valid NIC that matches regexp2
        cy.get('@nic').clear().type('012345678912');
        cy.get('@nic').should('have.value', '012345678912');
        cy.get('@nic').invoke('val').should('match', regexp2);    
      });
    });

//Todo Dilini
describe('Account Number Validation', () => {
  const accountNumberRegexp = /^[0-9]{20}$/;

  it('should validate the account number entered in the input field', () => {
    // Enter an invalid account number
    cy.get('[placeholder="Enter Account Number"]').as('accountNumber').type('12345678');
    cy.get('@accountNumber').should('have.value', '12345678');
    cy.get('@accountNumber').invoke('val').should('not.match', accountNumberRegexp);

    // Enter a valid account number
    cy.get('@accountNumber').clear().type('12345678901234567890');
    cy.get('@accountNumber').should('have.value', '12345678901234567890');
    cy.get('@accountNumber').invoke('val').should('match', accountNumberRegexp);
  });
});
});


