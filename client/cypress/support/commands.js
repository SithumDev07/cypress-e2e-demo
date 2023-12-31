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
});

Cypress.Commands.add("GetAllInstructors", () => {

    return cy.getAllLocalStorage().then((storageMap) => {
        const originData = storageMap['http://localhost:3000'];
        const token = originData['token'];

        return cy.request({
            method: "GET",
            url: "http://localhost:4000/akura/instructor",
            headers: {
                'x-auth-token': token
            }
        }).then(res => {

            let instructors = [];

            res.body.map((instructor) => {
                instructors.push(`${instructor.firstName.trim()} ${instructor.lastName.trim()}`);
            })

            return instructors;
        });
    });
});

Cypress.Commands.add("isStrongPassword", (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  });

  Cypress.Commands.add('validateNIC', (nic) => {
    const newNICRegex = /^[0-9]{9}[VX]|[0-9]{12}$/;
    const pastNICRegex = /^([0-9]{2}([0-3]{1}|[5-8]{1})[0-9]{6}[VX])|([0-9]{12})$/;
    return newNICRegex.test(nic) || pastNICRegex.test(nic);
  });
  
  // Define the custom Cypress command to check password strength
  Cypress.Commands.add("isStrongPassword", (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialSymbol = /[\W_]/.test(password);
    const isLongEnough = password.length >= 8;
  
    return hasUppercase && hasLowercase && hasDigit && hasSpecialSymbol && isLongEnough;
  });
