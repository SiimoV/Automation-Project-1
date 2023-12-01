beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_3.html");
});

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
   */

// radio buttons and its content

describe("Registration Form Visual Tests", () => {
  it("should have exactly 4 radio buttons", () => {
    cy.get('input[type="radio"]').should("have.length", 4);
    cy.get('input[type="radio"]').next().eq(0).should("have.text", "Daily");
    cy.get('input[type="radio"]').next().eq(1).should("have.text", "Weekly");
    cy.get('input[type="radio"]').next().eq(2).should("have.text", "Monthly");
    cy.get('input[type="radio"]').next().eq(3).should("have.text", "Never");
  });
  // dropdown and dependencies between 2 dropdowns
  it("should select a country and verify dependent cities", () => {
    cy.get("#country").select("Spain");
    cy.get("#city").should("contain", "Madrid");
    cy.get("#city").should("contain", "Valencia");
  });
  // checkboxes, their content and links
  it("Checkbox 1: Accept our privacy policy", () => {
    cy.get('[ng-model="checkbox"]').check();
    cy.contains("Accept our privacy policy").should("be.visible");
    //cy.get("?????").should("be.visible");
  });
  it("Checkbox 2: Accept our cookie policy", () => {
    cy.get('[type="checkbox"]').eq(1).check();
    cy.contains("Accept our cookie policy").should("be.visible");
    cy.get('[href="cookiePolicy.html"]').should("be.visible");
  });

  // email format
  it("should validate correct email format", () => {
    // Enter a valid email address
    cy.get("input.email").type("test@example.com");
    cy.get("input.email").should("have.class", "ng-valid-email");
  });

  it("should validate incorrect email format", () => {
    cy.get("input.email").type("invalidemail");
    cy.get("input.email").should("have.class", "ng-invalid-email");
  });

  it("should validate incorrect email format", () => {
    cy.get("#email").type("invalidemail");
    cy.get("#email").should("not.have.attr", "pattern");
  });
  /*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
});
