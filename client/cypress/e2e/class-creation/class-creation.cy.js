/* eslint-disable no-undef */
/// <reference types="cypress" />

import Chance from "chance";

const chance = new Chance();

describe('Create class', () => {

    beforeEach(() => {
        cy.loginCommand("admin@gmail.com", "ASas!@12");
        cy.get('[href="/class/create"] > .MuiButtonBase-root').as("CreateClassButton");
        cy.get("@CreateClassButton").click();
        
            
    })

    // TODO: Sithum
    describe('Select instructor',  () => {

        it('should navigate to the create class page',  () => {
            cy.url().should("include", "create");
            cy.url().should("include", "class");
        });
    });

    // TODO: Malithi
    describe("Select Class Type", () => {
        
        
        it('should open and blur the class type dropdown', () => {
            
            cy.get('[placeholder="Select class type"]') .as('classAutocomplete');

            cy.get('@classAutocomplete').click();

            cy.get('@classAutocomplete').blur();

            cy.get('@classAutocomplete').click();
    
            cy.get('[role="option"]').should('have.length.above', 0);

            //click the first option

            cy.get('[role="option"]').first().click();
        
        }
        )

        

        


    })

})