/* eslint-disable no-undef */
/// <reference types="cypress" />

import Chance from "chance";

const chance = new Chance();

describe('Create class', () => {


    describe("Authorized users", () => {

        beforeEach(() => {
            cy.loginCommand("admin@gmail.com", "ASas!@12");
            cy.get('[href="/class/create"] > .MuiButtonBase-root').as("CreateClassButton");
            cy.get("@CreateClassButton").click();
        })

        it("should navigate to create class page for authorized users", () => {
            it('should navigate to the create class page', () => {
                cy.url().should("include", "create");
                cy.url().should("include", "class");
            });
        });

        // TODO: Sithum
        describe('Select instructor', () => {

            beforeEach(() => {
                cy.get(':nth-child(1) > .MuiAutocomplete-root > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').as("InstructorDropDown");
                cy.get(':nth-child(1) > .MuiAutocomplete-root > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').find('input').as("InstructorDropDownInput");
            })

            it("should select instructor dropdown exists", () => {
                cy.get('@InstructorDropDown').should('have.length', 1);
            });

            it('should select instructor dropdown placeholder exists', () => {
                cy.get("@InstructorDropDownInput").invoke("attr", "placeholder").should("eq", "Select instructor");
            });

            it("should focus and blur the select instructor dropdown", () => {
                cy.get("@InstructorDropDownInput").type("something").should('have.focus').blur().should('not.have.focus');
            });

            it("should fetch all the instructors", () => {

                cy.intercept("GET", "http://localhost:4000/akura/instructor").as("FetchAllInstructors");

                cy.GetAllInstructors();

                // TODO: Sithum

                // cy.wait("@FetchAllInstructors").then((response) => {
                //     cy.log(response);
                //     expect(response.response.statusCode).eq(200);
                // });
            })

            it("should empty by default", () => {
                cy.get("@InstructorDropDown").should("have.value", '');
            });

            it("should display same number of instructors receiving from the API", () => {
                cy.get("@InstructorDropDown").click();

                cy.get('.MuiAutocomplete-option').then((el) => {

                    cy.GetAllInstructors().then(instructors => {
                        cy.get('.MuiAutocomplete-option').should("have.length", instructors.length);
                    });

                });

            })

            it("should display the instructors receiving from the API", () => {
                cy.get("@InstructorDropDown").click()

                cy.get('.MuiAutocomplete-option').then((el) => {

                    cy.GetAllInstructors().then(instructors => {
                        for (let i = 0; i < el.length; i++) {
                            expect(`${el[i].innerText.toString().trim()}`).to.eq(instructors[i].toString().trim())
                        }
                    });

                });

            });
        });

        // TODO: Malithi
        describe("Select Class Type", () => {


            it('should open and blur the class type dropdown', () => {

                    cy.get('[placeholder="Select class type"]').as('classAutocomplete');

                    cy.get('@classAutocomplete').click();

                    cy.get('@classAutocomplete').blur();

                    cy.get('@classAutocomplete').click();


                    // TODO: Test case for dropdown options should have a separate test case (not inside this test case)

                    cy.get('[role="option"]').should('have.length.above', 0); // TODO: Since there are only two options to choose from. We can specify the length as 2.

                    //click the first option

                    cy.get('[role="option"]').first().click(); // TODO: After selecting the first item, we can ensure that selected item is 'Group Class'

                }
            )


        });

        // TODO: Sithum
        describe("Select date", () => {
            beforeEach(() => {
                cy.get('[data-cy=select-grade]').find('input').as('DateSelectDropdown');
                cy.get('[data-cy=select-grade-wrapper]').as('DateSelectDropdownWrapper');
            });

            it("should select grade dropdown exists", () => {
                cy.get('[placeholder="Select grade"]').should('have.length', 1);
            });

            it('should date dropdown placeholder exists', () => {
                cy.get("@DateSelectDropdown").invoke("attr", "placeholder").should("eq", "Select grade");
            });

            it("should focus and blur the date dropdown", () => {
                cy.get("@DateSelectDropdown").type("something").should('have.focus').blur().should('not.have.focus');
            });

            describe("Date selection", () => {

                beforeEach(() => {
                    cy.get("@DateSelectDropdown").click();
                });

                it("should contains two groups", () => {

                    cy.get('.MuiAutocomplete-groupLabel').should("have.length", 2);

                });

                it.only("should contains group labels", () => {

                    cy.get('.MuiAutocomplete-groupLabel').then(($labels) => {
                        expect($labels.get(0).innerText).to.eq("Weekdays");
                        expect($labels.get(1).innerText).to.eq("Weekends");
                    });

                });

            });


        });


    })

    describe("Unauthorized users", () => {

        // TODO:
        it("should not navigate to create class", () => {

        });

    });


})