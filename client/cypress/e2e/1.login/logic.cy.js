/* eslint-disable no-undef */
/// <reference types="cypress" />

import Chance from "chance";

const chance = new Chance();

describe("Login Page", () => {
  const email = chance.email();
  const password = "qwerty";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })

  describe("Login UI", () => {
    beforeEach(() => {
      cy.get('button[type="submit"]').as("LoginButton");
      cy.get('button').contains("Register").as("RegisterButton");
      cy.get('button').contains("View all Classes").as("ViewAllClassesButton");
      cy.get('input[type="email"]').as("EmailInputField");
      cy.get('input[type="password"]').as("PasswordInputField");
    });

    it("Should have a login button", () => {
      cy.get('@LoginButton').should("exist");
    });

    it("Should have a email input field", () => {
      cy.get('@EmailInputField').should("exist");
    });

    it("Should have a password input field", () => {
      cy.get('@PasswordInputField').should("exist");
    });

    it("Should have a register button", () => {
      cy.get('@RegisterButton').should("exist");
    });

    it("Should have a view all classes button", () => {
      cy.get('@ViewAllClassesButton').should("exist");
    });

    it("Should show error messages", () => {
      // cy.pause();

      cy.get('@LoginButton').click()

      cy.contains("Email is required");
      cy.contains("Password is required");
    });

    it("Should show invalid email message", () => {
      cy.get("@EmailInputField").type("invalid");
      cy.contains("Enter valid email");
    });

    it("Should navigate to the student register page", () => {
      cy.get("@RegisterButton").click();

      cy.url().should("include", "student");
      cy.url().should("include", "register");
    });

    it("Should navigate to all classes page", () => {
      cy.get("@ViewAllClassesButton").click();

      cy.url().should("include", "classes");
    });
  });

  describe("Login Authentication", () => {
    beforeEach(() => {
      cy.get('button[type="submit"]').as("LoginButton");
      cy.get('input[type="email"]').as("EmailInputField");
      cy.get('input[type="password"]').as("PasswordInputField");

      cy.intercept("POST", "http://localhost:4000/login")
    });

    it("Should redirect unauthenticated user to login page", () => {

      const log = Cypress.log({
        name: "login",
        displayName: "LOGIN",
        message: [`🔐 Authenticating | ${email}`],
        // @ts-ignore
        autoEnd: false,
      });

      cy.intercept("POST", "http://localhost:4000/public/akura/login").as("loginUser");

      log.snapshot("before")

      cy.get("@EmailInputField").type(email);
      cy.get("@PasswordInputField").type(password);

      cy.get("@LoginButton").click();

      cy.wait("@loginUser").its("response.statusCode").should("eq", 400);

      log.snapshot("after");
      log.end();

      cy.contains("Invalid credentials");

    });

    it("Should navigate authenticated user to profile page", () => {

      const email = "admin@gmail.com";
      const password = "ASas!@12";

      const log = Cypress.log({
        name: "login",
        displayName: "LOGIN",
        message: [`🔐 Authenticating | ${email}`],
        // @ts-ignore
        autoEnd: false,
      });

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

        log.end();
      });

      cy.url().should("include", "profile");
    })
  })
});
