/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Create Class', () => {
  
  beforeEach('passes', () => {
    cy.visit('http://localhost:3000')
  })
  

  describe("Login as admin", () => {
    beforeEach(()=>{
      cy.get('input[type="email"]').as("EmailInputField");
      cy.get('input[type="password"]').as("PasswordInputField");
    })
    
    
    it("Should login as a admin", () => {
      const email = "admin@gmail.com";
      const password = "ASas!@12";
      
      cy.get('input[type="email"]').type(`${email}`)
      cy.get('input[type="password"]').type(`${email}`)
      cy.get('button').contains("Login").click()
      cy.get('button').contains("Register Instructor").click()
    })
    
    

    // it("Should navigate to create class button", () => {
    // })
  })
  
  // describe("Navigate to create class tab", () => {
  //   beforeEach(()=>{
  //     cy.get('button').contains("Create Class").as("CreateClassButton");
  //     // cy.get('input[type="password"]').as("PasswordInputField");
  //   })
    
    

  // })
  
  




})