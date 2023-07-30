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
        cy.get(
          ":nth-child(1) > .MuiAutocomplete-root > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root"
        )
          .find("input")
          .as("InstructorDropDownInput");
      });

      it("should select instructor dropdown exists", () => {
        cy.get("@InstructorDropDown").should("have.length", 1);
      });

      it("should select instructor dropdown placeholder exists", () => {
        cy.get("@InstructorDropDownInput")
          .invoke("attr", "placeholder")
          .should("eq", "Select instructor");
      });

      it("should focus and blur the select instructor dropdown", () => {
        cy.get("@InstructorDropDownInput")
          .type("something")
          .should("have.focus")
          .blur()
          .should("not.have.focus");
      });

      it("should fetch all the instructors", () => {
        cy.intercept("GET", "http://localhost:4000/akura/instructor").as(
          "FetchAllInstructors"
        );

        cy.GetAllInstructors();

        // TODO: Sithum

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
        const days = [
          {
            type: "Weekdays",
            label: "Monday",
            // value : 'group',
          },
          {
            type: "Weekdays",
            label: "Tuesday",
            // value : 'group',
          },
          {
            type: "Weekdays",
            label: "Wednesday",
            // value : 'group',
          },
          {
            type: "Weekdays",
            label: "Thursday",
            // value : 'group',
          },
          {
            type: "Weekdays",
            label: "Friday",
            // value : 'group',
          },
          {
            type: "Weekends",
            label: "Saturday",
            // value : 'group',
          },
          {
            type: "Weekends",
            label: "Sunday",
            // value : 'group',
          },
        ];

        beforeEach(() => {
          cy.get("@DateSelectDropdown").click();
        });

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
      });
    });

    //TODO: Theruni
    describe("Select paymentLink", () => {
      beforeEach(() => {
        cy.get("[data-cy=payment-link]")
          .find("input")
          .as("PaymentLinkTextField");
      });

      it("should payment link text field exists", () => {
        cy.get("@PaymentLinkTextField").should("be.visible");
      });

      it("should payment link text field placeholder exists", () => {
        cy.get("@PaymentLinkTextField")
          .invoke("attr", "placeholder")
          .should("eq", "Enter payment link generated by payhere");
      });

      it("should focus and blur the payment link text field", () => {
        cy.get("@PaymentLinkTextField")
          .type("something")
          .should("have.focus")
          .blur()
          .should("not.have.focus");
      });

      it("should test a invalid url format", () => {
        cy.get("@PaymentLinkTextField").type("something");

        try {
          new URL(urlInput);
        } catch (_) {
          throw new Error("Invalid URL format");
        }

        cy.request(urlInput).then((res) => {
          expect(res.status).to.eq(200);
        });
      });

      it("should test a valid url", () => {
        cy.get("@PaymentLinkTextField").type("https://stackoverflow.com/");

        const urlInput = "https://stackoverflow.com/";

        try {
          new URL(urlInput);
        } catch (_) {
          throw new Error("Invalid URL format");
        }

        cy.request(urlInput).then((res) => {
          expect(res.status).to.eq(200);
        });
      });

      it("should test a invalid url", () => {
        cy.get("@PaymentLinkTextField").type("https://hihfg.com/");

        const urlInput = "https://hihfg.com/";

        try {
          new URL(urlInput);
        } catch (_) {
          throw new Error("Invalid URL format");
        }

        cy.request(urlInput).then((res) => {
          expect(res.status).to.eq(200);
        });
      });
    });

    //TODO: Theruni
    describe("Select classFee", () => {
      beforeEach(() => {
        cy.get("[data-cy=class-fee]").find("input").as("ClassFeeTextField");
      });

      it("should class fee text field should exists", () => {
        cy.get("@ClassFeeTextField").should("be.visible");
      });

      it("should class fee text field placeholder exists", () => {
        cy.get("@ClassFeeTextField")
          .invoke("attr", "placeholder")
          .should("eq", "Enter class fee amount");
      });

      it("should focus and blur the class fee text field", () => {
        cy.get("@ClassFeeTextField")
          .type("something")
          .should("have.focus")
          .blur()
          .should("not.have.focus");
      });

      it("should test a invalid class fee and show error message", () => {
        cy.get("@ClassFeeTextField").type("something");
        cy.contains("Admission fee is invalid");
      });
    });

    //TODO: Theruni
    describe("Select admissionFee", () => {
      beforeEach(() => {
        cy.get("[data-cy=admission-fee]")
          .find("input")
          .as("AdmissionFeeTextField");
      });

      it("should admission fee text field should exists", () => {
        cy.get("@AdmissionFeeTextField").should("be.visible");
      });

      it("should admission fee text field placeholder exists", () => {
        cy.get("@AdmissionFeeTextField")
          .invoke("attr", "placeholder")
          .should("eq", "Enter admission fee amount");
      });

      it("should focus and blur the admission fee text field", () => {
        cy.get("@AdmissionFeeTextField")
          .type("something")
          .should("have.focus")
          .blur()
          .should("not.have.focus");
      });

      it("should test a invalid admission fee and show error message", () => {
        cy.get("@AdmissionFeeTextField").type("something");
        cy.contains("Admission fee is invalid");
      });
    });

    //TODO: Theruni
    describe("start time picker", () => {
      beforeEach(() => {
        cy.get("[data-cy=start-time-picker]")
          .find("input")
          .as("StartTimePicker");
      });

      it("should open time picker", () => {
        cy.get("@StartTimePicker").click();
      });

      it("should display the default value as 6:00 AM", () => {
        cy.get('input[value="06:00 AM"]').should("have.length", 1);
      });

      it("should pick start time from the picker", () => {
        cy.get("@StartTimePicker").click();

        cy.get(".MuiCalendarOrClockPicker-root").within(() => {
          cy.contains("7").realClick(); // choose 07 hours
          cy.contains("30").realClick(); // choose 30 minutes
          cy.contains("PM").realClick();
        });

        cy.get(".MuiDialogActions-root").within(() => {
          cy.contains("OK").realClick();
        });

       
      });

      

    //   it.only("should display the default value as 6:00 AM", () => {
    //     cy.get('input[value="06:00 AM"]').should("have.length", 1);
    //   });
    });
  });

  describe("Unauthorized users", () => {
    // TODO:
    it("should not navigate to create class", () => {});
  });
});
