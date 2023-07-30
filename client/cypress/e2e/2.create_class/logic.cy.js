/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Create Class', () => {
  
  describe("Register Instructor", () => {
    beforeEach(()=>{
      cy.visit('http://localhost:3000')
      
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

    
    it("validate first name", () => {

      // check for number 
      cy.get('@firstNameInputField').type('123')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@firstNameInputField').clear()
      
      // check for letters with numbers 
      cy.get('@firstNameInputField').type('nisal123')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@firstNameInputField').clear()
      
      // check for letters with special chars 
      cy.get('@firstNameInputField').type('nisal.')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@firstNameInputField').clear()
      
      // check for name length 
      cy.get('@firstNameInputField').clear().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@firstNameInputField').clear()
   
      // check for valid 
      cy.get('@firstNameInputField').clear().type('nisal')  
      cy.get('@firstNameInputField').parents('.MuiFormControl-root').children().contains("Name is invalid").should("not.exist")
      
      // check for required
      cy.get('@firstNameInputField').clear()
      cy.get('@submitButton').click() 
      cy.get('.Mui-error').contains("Contact number is invalid").should("not.exist")
      cy.get('@firstNameInputField').parents('.MuiFormControl-root').children().contains("This field is required")
    })
    
    it("validate last name", () => {

      // check for number 
      cy.get('@lastNameInputField').type('123')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@lastNameInputField').clear()
      
      // check for letters with numbers 
      cy.get('@lastNameInputField').type('nisal123')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@lastNameInputField').clear()
      
      // check for letters with special chars 
      cy.get('@lastNameInputField').type('nisal.')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@lastNameInputField').clear()
      
      // check for name length 
      cy.get('@lastNameInputField').clear().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      cy.get('.Mui-error').contains("Name is invalid").should('be.visible')
      
      cy.get('@lastNameInputField').clear()
      
      // check for valid 
      cy.get('@lastNameInputField').clear().type('nisal')  
      cy.get('@lastNameInputField').parents('.MuiFormControl-root').children().contains("Name is invalid").should("not.exist")
      
      // check for required
      cy.get('@lastNameInputField').clear()
      cy.get('@submitButton').click() 
      cy.get('.Mui-error').contains("Contact number is invalid").should("not.exist")
      cy.get('@lastNameInputField').parents('.MuiFormControl-root').children().contains("This field is required")
    })
    
    it("validate contact number", () => {

      // // check for numbers 
      cy.get('@contactInputField').type('abc')
      cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
      cy.get('@contactInputField').clear()
      
      // check for letters with numbers 
      cy.get('@contactInputField').type('123abc')
      cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
      cy.get('@contactInputField').clear()
      
      // check for letters with special chars 
      cy.get('@contactInputField').type('123@')
      cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
      cy.get('@contactInputField').clear()
      
      // check for length 
      cy.get('@contactInputField').clear().type('071')
      cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
      cy.get('@contactInputField').clear()
      
      // check for length 
      cy.get('@contactInputField').clear().type('07123456789')
      cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
      cy.get('@contactInputField').clear()
      
      // should start with 0 
      cy.get('@contactInputField').clear().type('77123456789')
      cy.get('.Mui-error').contains("Contact number is invalid").should('be.visible')
      
      cy.get('@contactInputField').clear()
      
      // check for valid 
      cy.get('@contactInputField').clear().type('0712345678')      
      cy.get('.Mui-error').should('not.exist',"Contact number is invalid")
      
      // check for valid 
      cy.get('@contactInputField').clear() 
      cy.get('.Mui-error').should('not.exist',"Contact number is invalid")
      
      // check for required
      cy.get('@submitButton').click() 
      cy.get('.Mui-error').contains("Contact number is invalid").should("not.exist")
      cy.get('@contactInputField').parents('.MuiFormControl-root').children().contains("This field is required")
    })

    it("validate email", () => {

      // check with username 
      cy.get('@emailInputField').type('abc')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()

      // check with username | . |
      cy.get('@emailInputField').type('abc.')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()

      // check with username | . | domain name
      cy.get('@emailInputField').type('abc.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()

      // check with username | domain
      cy.get('@emailInputField').type('abc com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username | domainName | 
      cy.get('@emailInputField').type('nisal gmail ')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username | @ 
      cy.get('@emailInputField').type('nisal @')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username | # | domainName | . | domain
      cy.get('@emailInputField').type('nisal#gmailcom')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username | $ | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal123$gmail.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username start with number | $ | domainName | . | domain
      cy.get('@emailInputField').clear().type('123nisal$gmail.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()

      // check with username with multiple fullstops | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal..@gmail.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username with _ | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal_ss@gmail.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username ending with fullstop | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal.@gmail.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()
      
      // check with username ending with fullstop | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal.@gmail.com')
      cy.get('.Mui-error').contains("Email is invalid").should('be.visible')
      
      cy.get('@emailInputField').clear()

      // check with username | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal@gmail.com')
      cy.get('.Mui-error').should("not.exist","Email is invalid")
      
      cy.get('@emailInputField').clear()
      
      // check with username with fullstop | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal.perera@gmail.com')
      cy.get('.Mui-error').should("not.exist","Email is invalid")
      
      cy.get('@emailInputField').clear()
      
      // check with username ending with fullstop and numbers | @  | domainName | . | domain
      cy.get('@emailInputField').clear().type('nisal.123@gmail.com')
      cy.get('.Mui-error').should("not.exist","Email is invalid")
      
      cy.get('@emailInputField').clear()

      // check for required
      cy.get('@submitButton').click() 
      cy.get('.Mui-error').contains("Contact number is invalid").should("not.exist")
      cy.get('@emailInputField').parents('.MuiFormControl-root').children().contains("This field is required")

    })
  })  
})