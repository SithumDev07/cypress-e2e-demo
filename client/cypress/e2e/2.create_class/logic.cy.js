/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Create Class', () => {
  
  describe("Register Instructor", () => {
    beforeEach(()=>{
      cy.visit('http://localhost:3000')
      // cy.get('input[type="email"]').as("EmailInputField");
      // cy.get('input[type="password"]').as("PasswordInputField");
      // const email = "admin@gmail.com";
      // const password = "ASas!@12";
      
      // cy.get('input[type="email"]').type(`${email}`)
      // cy.get('input[type="password"]').type(`${password}`)
      // cy.get('button').contains("Login").click()
      
      cy.loginCommand("admin@gmail.com", "ASas!@12");
      cy.get('button').contains("Register Instructor").click()



      cy.get('[name="firstName"]').as('firstNameInputField')
      cy.get('[name="lastName"]').as('lastNameInputField')
      cy.get('[name="contact"]').as('contactInputField')
      cy.get('[name="email"]').as('emailInputField')
      cy.get('[name="nic"]').as('nicInputField')
      cy.get('[name="accNumber"]').as('accNumberInputField')
      cy.get('[name="subject"]').as('subjectInputField')
      cy.get('[name="password"]').as('passwordInputField')
      cy.get('[name="verifyPassword"]').as('verifyPasswordInputField')
      cy.get('button').contains('Cancel').as('cancelButton')
      cy.get('button').contains('Submit').as('submitButton')
      // cy.get('button').contains("Register Instructor").click()
    })
 

    // test availability of fields 
    it("Should have fields", () => {
      cy.get('@firstNameInputField').should('exist')
      cy.get('@lastNameInputField').should('exist')
      cy.get('@contactInputField').should('exist')
      cy.get('@emailInputField').should('exist')
      cy.get('@nicInputField').should('exist')
      cy.get('@accNumberInputField').should('exist')
      cy.get('@subjectInputField').should('exist')
      cy.get('@passwordInputField').should('exist')
      cy.get('@verifyPasswordInputField').should('exist')
      cy.get('@cancelButton').contains('Cancel').should('exist')
      cy.get('@submitButton').contains('Submit').should('exist')
    })

    
    // it("validate first name", () => {

    //   // check for number 
    //   cy.get('@firstNameInputField').type('123')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@firstNameInputField').clear()
      
    //   // check for letters with numbers 
    //   cy.get('@firstNameInputField').type('nisal123')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@firstNameInputField').clear()
      
    //   // check for letters with special chars 
    //   cy.get('@firstNameInputField').type('nisal.')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@firstNameInputField').clear()
      
    //   // check for name length 
    //   cy.get('@firstNameInputField').clear().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@firstNameInputField').clear()

    //   // check for valid 
    //   cy.get('@firstNameInputField').clear().type('nisal')      
    // })
    
    // it("validate last name", () => {

    //   // check for number 
    //   cy.get('@lastNameInputField').type('123')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@lastNameInputField').clear()
      
    //   // check for letters with numbers 
    //   cy.get('@lastNameInputField').type('nisal123')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@lastNameInputField').clear()
      
    //   // check for letters with special chars 
    //   cy.get('@lastNameInputField').type('nisal.')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@lastNameInputField').clear()
      
    //   // check for name length 
    //   cy.get('@lastNameInputField').clear().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    //   cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
    //   cy.get('@lastNameInputField').clear()

    //   // check for valid 
    //   cy.get('@lastNameInputField').clear().type('nisal')      
    // })
    
    // it("validate contact number", () => {

    //   // check for number 
    //   cy.get('@contactInputField').type('abc')
    //   cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
    //   cy.get('@contactInputField').clear()
      
    //   // check for letters with numbers 
    //   cy.get('@contactInputField').type('nisal123')
    //   cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
    //   cy.get('@contactInputField').clear()
      
    //   // check for letters with special chars 
    //   cy.get('@contactInputField').type('nisal.')
    //   cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
    //   cy.get('@contactInputField').clear()
      
    //   // check for length 
    //   cy.get('@contactInputField').clear().type('071')
    //   cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
    //   cy.get('@contactInputField').clear()
      
    //   // check for length 
    //   cy.get('@contactInputField').clear().type('07123456789')
    //   cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
    //   cy.get('@contactInputField').clear()

    //   // check for valid 
    //   cy.get('@contactInputField').clear().type('0712345678')      
    // })

    it("validate email", () => {

      // check for number 
      cy.get('@emailInputField').type('abc')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check for letters with numbers 
      cy.get('@emailInputField').type('nisal123')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check for letters with special chars 
      cy.get('@emailInputField').type('nisal.')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check for length 
      cy.get('@emailInputField').clear().type('071')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check for length 
      cy.get('@emailInputField').clear().type('07123456789')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()

      // check for valid 
      cy.get('@emailInputField').clear().type('0712345678')      
    })



  })
  
})