// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add("login", () => {
//   cy.visit("/login");
// });

Cypress.Commands.add('loginCommand', (email, password) => {

    cy.visit("http://localhost:3000")
    cy.get('button[type="submit"]').as("LoginButton");
    cy.get('input[type="email"]').as("EmailInputField");
    cy.get('input[type="password"]').as("PasswordInputField");

    cy.intercept("POST", "http://localhost:4000/public/akura/login").as("loginUser");

    cy.get("@EmailInputField").type(email);
    cy.get("@PasswordInputField").type(password);

    cy.get("@LoginButton").click();

    cy.wait("@loginUser").then((loggedUser) => {
        expect(loggedUser.response.statusCode).eq(200);

        cy.getAllLocalStorage().then((result) => {
            expect(result).to.deep.equal({
                "http://localhost:3000": {
                    token: loggedUser.response.body.token,
                    user: JSON.stringify(loggedUser.response.body.info.user)
                }
            })
        });
    });

    cy.url().should("include", "profile");
})