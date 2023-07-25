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

    })

})