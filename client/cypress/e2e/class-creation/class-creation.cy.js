/* eslint-disable no-undef */
/// <reference types="cypress" />

import Chance from "chance";

const chance = new Chance();

describe("Create class", () => {
  describe("Authorized users", () => {
    beforeEach(() => {
      cy.loginCommand("admin@gmail.com", "ASas!@12");
      cy.get('[href="/class/create"] > .MuiButtonBase-root').as(
        "CreateClassButton"
      );
      cy.get("@CreateClassButton").click();
    });

    it("should navigate to create class page for authorized users", () => {
      it("should navigate to the create class page", () => {
        cy.url().should("include", "create");
        cy.url().should("include", "class");
      });
    });

    // TODO: Sithum
    describe("Select instructor", () => {
      beforeEach(() => {
        cy.get(
          ":nth-child(1) > .MuiAutocomplete-root > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root"
        ).as("InstructorDropDown");
      });

      it("should navigate to the create class page", () => {
        cy.url().should("include", "create");
        cy.url().should("include", "class");
      });

      it("should fetch all the instructors", () => {
        cy.intercept("GET", "http://localhost:4000/akura/instructor").as(
          "FetchAllInstructors"
        );

        cy.GetAllInstructors();

        // TODO:

        // cy.wait("@FetchAllInstructors").then((response) => {
        //     cy.log(response);
        //     expect(response.response.statusCode).eq(200);
        // });
      });

      it("should empty by default", () => {
        cy.get("@InstructorDropDown").should("have.value", "");
      });

      it("should display same number of instructors receiving from the API", () => {
        cy.get("@InstructorDropDown").click();

        cy.get(".MuiAutocomplete-option").then((el) => {
          cy.GetAllInstructors().then((instructors) => {
            cy.get(".MuiAutocomplete-option").should(
              "have.length",
              instructors.length
            );
          });
        });
      });

      it("should display the instructors receiving from the API", () => {
        cy.get("@InstructorDropDown").click();

        cy.get(".MuiAutocomplete-option").then((el) => {
          cy.GetAllInstructors().then((instructors) => {
            for (let i = 0; i < el.length; i++) {
              expect(`${el[i].innerText.toString().trim()}`).to.eq(
                instructors[i].toString().trim()
              );
            }
          });
        });
      });

      it("should filter instructors by query", () => {
        cy.get("@InstructorDropDown").type("Rod");
        cy.get("@InstructorDropDown").click();
        cy.get(".MuiAutocomplete-option").should("have.length", 1);
      });
    });

    // TODO: Malithi
    describe("Select Class Type", () => {
      it("should open and blur the class type dropdown", () => {
        cy.get('[placeholder="Select class type"]').as("classAutocomplete");

        cy.get("@classAutocomplete").click();

        cy.get("@classAutocomplete").blur();

        cy.get("@classAutocomplete").click();

        // TODO: Test case for dropdown options should have a separate test case (not inside this test case)

        cy.get('[role="option"]').should("have.length.above", 0); // TODO: Since there are only two options to choose from. We can specify the length as 2.

        //click the first option

        cy.get('[role="option"]').first().click(); // TODO: After selecting the first item, we can ensure that selected item is 'Group Class'
      });
    });

    // TODO: Sithum
    describe("Select date", () => {
      beforeEach(() => {
        cy.get("[data-cy=select-grade]").find("input").as("DateSelectDropdown");
        cy.get("[data-cy=select-grade-wrapper]").as(
          "DateSelectDropdownWrapper"
        ); // TODO: If not needed, remove (remove the test-id also)
      });

      it("should select grade dropdown exists", () => {
        cy.get('[placeholder="Select grade"]').should("have.length", 1);
      });

      it("should date dropdown placeholder exists", () => {
        cy.get("@DateSelectDropdown")
          .invoke("attr", "placeholder")
          .should("eq", "Select grade");
      });

      it("should focus and blur the date dropdown", () => {
        cy.get("@DateSelectDropdown")
          .type("something")
          .should("have.focus")
          .blur()
          .should("not.have.focus");
      });

      describe("Date selection", () => {
        beforeEach(() => {
          cy.get("@DateSelectDropdown").click();
        });

        const days = [
          {
            type: "Weekdays",
            label: "Monday",
          },
          {
            type: "Weekdays",
            label: "Tuesday",
          },
          {
            type: "Weekdays",
            label: "Wednesday",
          },
          {
            type: "Weekdays",
            label: "Thursday",
          },
          {
            type: "Weekdays",
            label: "Friday",
          },
          {
            type: "Weekends",
            label: "Saturday",
          },
          {
            type: "Weekends",
            label: "Sunday",
          },
        ];

        it("should contains two label groups", () => {
          cy.get(".MuiAutocomplete-groupLabel").should("have.length", 2);
        });

        it("should contains group labels", () => {
          cy.get(".MuiAutocomplete-groupLabel").then(($labels) => {
            expect($labels.get(0).innerText).to.eq("Weekdays");
            expect($labels.get(1).innerText).to.eq("Weekends");
          });
        });

        it("should all the days in week exists", () => {
          cy.get(".MuiAutocomplete-option").should("have.length", 7);
        });

        it("should display all weekdays inside the dropdown", () => {
          cy.get(".MuiAutocomplete-option").then(($option) => {
            days
              .filter((day) => day.type === "Weekdays")
              .map((day, index) => {
                expect(`${$option[index].innerText.toString().trim()}`).to.eq(
                  day.label.toString().trim()
                );
              });
          });
        });

        it("should display all weekends inside the dropdown", () => {
          cy.get(".MuiAutocomplete-option").then(($option) => {
            days
              .filter((day) => day.type === "Weekends")
              .reverse()
              .map((day, index) => {
                expect(
                  `${$option[days.length - index - 1].innerText
                    .toString()
                    .trim()}`
                ).to.eq(day.label.toString().trim());
              });
          });
        });

        it("should select a day", () => {
          cy.get(".MuiAutocomplete-option").then(($element) => {
            $element.click();
            cy.get("@DateSelectDropdown").should(
              "have.value",
              $element[0].innerText
            );
          });
        });

        it("should filter days", () => {
          cy.get("@DateSelectDropdown").type("Mon");
          cy.get("@DateSelectDropdown").click();
          cy.get(".MuiAutocomplete-option").should("have.length", 1);
        });
      });
    });

    //TODO : Sandamini

    describe("Select Grade", () => {
      it("should focus and blur the grade dropdown", () => {
        // Find the input element inside the div with data-cy="select-grades"
        cy.get('[data-cy="select-grades"] input').as("gradesAutoCompleteInput");

        // Set focus on the grade dropdown input
        cy.get("@gradesAutoCompleteInput").focus();

        // Trigger the blur event on the focused dropdown input
        cy.get("@gradesAutoCompleteInput").blur();

        cy.get("@gradesAutoCompleteInput").click();

        cy.get('[role="option"]').should("have.length.above", 0);

        // Optionally, you can also check the total number of options in the dropdown
        cy.get('[role="option"]').should("have.length", 8);
      });

      it("should verify all the grade are included", () => {
        cy.get('[data-cy="select-grades"]').as("gradesAutoComplete");

        // cy.get('[data-cy="select-grades"]').as("gradesAutoComplete");
        cy.get("@gradesAutoComplete").click();

        // Check if "Grade 6" to "Grade 13"  are present in the dropdown
        cy.get('[role="option"]').should("contain.text", "Grade 6");

        cy.get('[role="option"]').should("contain.text", "Grade 7");

        cy.get('[role="option"]').should("contain.text", "Grade 8");

        cy.get('[role="option"]').should("contain.text", "Grade 9");

        cy.get('[role="option"]').should("contain.text", "Grade 10");

        cy.get('[role="option"]').should("contain.text", "Grade 11");

        cy.get('[role="option"]').should("contain.text", "Grade 12");

        cy.get('[role="option"]').should("contain.text", "Grade 13");
      });
    });

    describe("Select Hall", () => {
      it("should open and blur the hall dropdown", () => {
        cy.get('[placeholder="Select hall"]').as("hallAutocomplete");

        cy.get("@hallAutocomplete").click();

        cy.get("@hallAutocomplete").blur();

        cy.get("@hallAutocomplete").click();

        // TODO: Test case for dropdown options should have a separate test case (not inside this test case)

        cy.get('[role="option"]').should("have.length.above", 0); // TODO: Since there are only two options to choose from. We can specify the length as 2.

        // Optionally, you can also check the total number of options in the dropdown
        cy.get('[role="option"]').should("have.length", 3);

        //click the first option

        cy.get('[role="option"]').first().click(); // TODO: After selecting the first item, we can ensure that selected item is 'Group Class'

        // After selecting the first item, you can ensure that the selected item is 'Hall A'
        cy.get("@hallAutocomplete").should("have.value", "Hall A");
      });
    });

    describe("Submission", () => {
      it("should submit button exists", () => {
        cy.get("button[type='submit']")
          .should("exist")
          .should("be.visible")
          .should("be.enabled");
      });
    });
  });

  describe("Unauthorized users", () => {
    // TODO:
    it("should not navigate to create class", () => {});
  });
});
