/* eslint-disable no-undef */
/// <reference types="cypress" />

import Chance from "chance";

const chance = new Chance();

describe("Login Page", () => {
  const email = chance.email();
  const password = "qwerty";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should have a login button", () => {
    cy.contains("Login");
  });

  it("Should have a view all classes button", () => {
    cy.contains("View all Classes");
  });

  it("Should have a login button", () => {
    cy.contains("Login");
  });

  it("Should show error messages", () => {
    // cy.pause();

    cy.contains("Login").click();

    cy.contains("Email is required");
    cy.contains("Password is required");
  });

  it("Should show invalid email message", () => {
    cy.get("input[type=email]").type("invalid");

    cy.contains("Enter valid email");
  });

  it("Should navigate to the student register page", () => {
    cy.contains("Register").click();

    cy.url().should("include", "student");
    cy.url().should("include", "register");
  });

  it("Should navigate to all classes page", () => {
    cy.contains("View all Classes").click();

    cy.url().should("include", "classes");
  });
});
