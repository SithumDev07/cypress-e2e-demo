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

    describe("Select First Name", () => {
      beforeEach(() => {
          cy.get('[data-cy=first-name]').find("input").as("firstName");
      });

      it("should first name text field should exists", () => {
          cy.get("@firstName").should("be.visible")
      });

      it("should first name text field placeholder exists", () => {
          cy.get("@firstName").invoke("attr", "placeholder").should("eq", "Enter first name");
      });

      it("should focus and blur the first name text field", () => {
          cy.get("@firstName").type("firstName").should("have.focus").blur().should("not.have.focus");
      });
  });

  describe("Select Last Name", () => {
    beforeEach(() => {
        cy.get('[data-cy=last-name]').find("input").as("lastName");
    });

    it("should last name text field should exists", () => {
        cy.get("@lastName").should("be.visible")
    });

    it("should last name text field placeholder exists", () => {
        cy.get("@lastName").invoke("attr", "placeholder").should("eq", "Enter last name");
    });

    it("should focus and blur the last name text field", () => {
        cy.get("@lastName").type("lastName").should("have.focus").blur().should("not.have.focus");
    });

});

describe("Select contact number", () => {
  beforeEach(() => {
      cy.get('[data-cy=contact-number]').find("input").as("contactNumber");
  });

  it("should contact number text field should exists", () => {
      cy.get("@contactNumber").should("be.visible")
  });

  it("should contact number text field placeholder exists", () => {
      cy.get("@contactNumber").invoke("attr", "placeholder").should("eq", "Enter contact number");
  });

  it("should focus and blur the contact number text field", () => {
      cy.get("@contactNumber").type("0716613876").should("have.focus").blur().should("not.have.focus");
  });

});

describe("Select email address", () => {
  beforeEach(() => {
      cy.get('[data-cy=email-address]').find("input").as("email");
  });

  it("should email text field should exists", () => {
      cy.get("@email").should("be.visible")
  });

  it("should email text field placeholder exists", () => {
      cy.get("@email").invoke("attr", "placeholder").should("eq", "Enter email address");
  });

  it("should focus and blur the email text field", () => {
      cy.get("@email").type("dilininadeesha2018@gmail.com").should("have.focus").blur().should("not.have.focus");
  });
});

describe("Select NIC", () => {
  beforeEach(() => {
      cy.get('[data-cy=nic-number]').find("input").as("nic");
  });

  it("should first name text field should exists", () => {
      cy.get("@nic").should("be.visible")
  });

  it("should NIC text field placeholder exists", () => {
      cy.get("@nic").invoke("attr", "placeholder").should("eq", "Enter NIC number");
  });

  it("should focus and blur the NIC text field", () => {
      cy.get("@nic").type("978263925v").should("have.focus").blur().should("not.have.focus");
  });
});

describe("Select Account number", () => {
  beforeEach(() => {
      cy.get('[data-cy=account-number]').find("input").as("accnum");
  });

  it("should Account number text field should exists", () => {
      cy.get("@accnum").should("be.visible")
  });

  it("should Account number text field placeholder exists", () => {
      cy.get("@accnum").invoke("attr", "placeholder").should("eq", "Enter Account Number");
  });

  it("should focus and blur the Account number text field", () => {
      cy.get("@accnum").type("785889655522548").should("have.focus").blur().should("not.have.focus");
  });
});

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


