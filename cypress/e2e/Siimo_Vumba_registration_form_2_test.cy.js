beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

/*
Assignement 4: add content to the following tests
*/

describe("Section 1: Functional tests", () => {
  // 1
  it("User can use only same both first and validation passwords", () => {
    // Add test steps for filling in only mandatory fields
    cy.get("#username").type("SiimoV");
    cy.get("#email").type("Siimo@test.ee");
    cy.get('input[name="name"]').type("Siimo");
    cy.get("#lastName").type("Vumba");
    cy.get('[data-testid="phoneNumberTestId"]').type("1122334455");
    cy.get("#password").type("Siimo123");
    // Type confirmation password which is different from first password
    cy.get("#confirm").type("123");
    // Assert that submit button is not enabled
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    // Assert that successful message is not visible
    cy.get("#success_message").should("not.be.visible");
    // Assert that error message is visible
    cy.get("#password_error_message")
      .should("be.visible")
      .should("contain", "Passwords do not match!");
    // Change the test so, that now there are the same values in the password and confirmation password input fields
    cy.get("#confirm").clear();
    cy.get("#confirm").type("Siimo123");
    cy.get("h2").contains("Password").click();
    //Assert that the error message is not visible anymore and the submit button is enabled
    cy.get("#password_error_message").should("not.be.visible");
    cy.get(".submit_button").should("be.enabled");
  });

  // 2
  it("User can submit form with all fields added", () => {
    // Add test steps for filling in ALL fields
    cy.get("#username").type("SiimoV");
    cy.get("#email").type("Siimo@test.ee");
    cy.get('input[name="name"]').type("Siimo");
    cy.get("#lastName").type("Vumba");
    cy.get('[data-testid="phoneNumberTestId"]').type("1122334455");
    cy.get("#javascriptFavLanguage").check();
    cy.get("#vehicle2").check();
    cy.get("#cars").select("saab");
    cy.get("#animal").select("snake");
    cy.get("#password").type("Siimo123");
    cy.get("#confirm").type("Siimo123");
    // Assert that submit button is enabled
    cy.get("h2").contains("Password").click();
    // Assert that after submitting the form system show successful message
    cy.get(".submit_button").click();
  });

  // 3
  it("User can submit form with valid data and only mandatory fields added", () => {
    // Add test steps for filling in ONLY mandatory fields
    // Assert that submit button is enabled
    inputValidData("SiimoV");

    // Assert that after submitting the form system show successful message
    cy.get(".submit_button").click();
  });

  // Add at least 1 test for checking some mandatory field's absence
  it("Submit button is not enabled when some mandatory field is not present", () => {
    inputValidData("SiimoV");
    cy.get("#email").scrollIntoView();
    cy.get("#email").clear();
    cy.get(".submit_button").click();
  });
});

/*
Assignement 5: create more visual tests
*/

describe("Section 2: Visual tests", () => {
  it("Check that logo is correct and has correct size", () => {
    cy.log("Will check logo source and size");
    cy.get("img")
      .should("have.attr", "src")
      .should("include", "cerebrum_hub_logo");
    // get element and check its parameter height, to less than 178 and greater than 100
    cy.get("img")
      .invoke("height")
      .should("be.lessThan", 178)
      .and("be.greaterThan", 100);
  });

  it("My test for second picture", () => {
    // Create similar test for checking the second picture
    cy.log("Will check second logo source and size");
    cy.get('[data-cy="cypress_logo"]')
      .should("have.attr", "src")
      .should("include", "cypress_logo");
    // get element and check its parameter height, to less than 178 and greater than 100
    cy.get('[data-cy="cypress_logo"]')
      .invoke("height")
      .should("be.lessThan", 178)
      .and("be.greaterThan", 100);
  });

  it("Check navigation part", () => {
    cy.get("nav").children().should("have.length", 2);

    // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");

    // Get navigation element, find its first child, check the link content and click it
    cy.get("nav")
      .children()
      .eq(0)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_1.html")
      .click();

    // Check that currently opened URL is correct
    cy.url().should("contain", "/registration_form_1.html");
  });

  // Create similar test for checking the second link
  it("Check navigation part 2", () => {
    cy.get("nav").children().should("have.length", 2);

    // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");

    // Get navigation element, find its first child, check the link content and click it
    cy.get("nav")
      .children()
      .eq(1)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_3.html")
      .click();

    // Check that currently opened URL is correct
    cy.url().should("contain", "/registration_form_3.html");
  });

  it("Check that radio button list is correct", () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should("have.length", 4);

    // Verify labels of the radio buttons
    cy.get('input[type="radio"]').next().eq(0).should("have.text", "HTML");
    cy.get('input[type="radio"]').next().eq(1).should("have.text", "CSS");
    cy.get('input[type="radio"]')
      .next()
      .eq(2)
      .should("have.text", "JavaScript");
    cy.get('input[type="radio"]').next().eq(3).should("have.text", "PHP");

    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");
    cy.get('input[type="radio"]').eq(2).should("not.be.checked");
    cy.get('input[type="radio"]').eq(3).should("not.be.checked");

    // Selecting one will remove selection from other radio button
    cy.get('input[type="radio"]').eq(0).check().should("be.checked");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
  });

  // Create test similar to previous one verifying check boxes
  it("Check that check box list is correct", () => {
    cy.get('input[type="checkbox"]');

    // Verify labels
    cy.get('input[type="checkbox"]')
      .next()
      .eq(0)
      .should("have.text", "I have a bike");
    cy.get('input[type="checkbox"]')
      .next()
      .eq(1)
      .should("have.text", "I have a car");
    cy.get('input[type="checkbox"]')
      .next()
      .eq(2)
      .should("have.text", "I have a boat");

    //Verify default state
    cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(2).should("not.be.checked");
  });

  it("Car dropdown is correct", () => {
    // Here is an example how to explicitely create screenshot from the code
    // Select second element and create screenshot for this area, and full page
    cy.get("#cars").select(1).screenshot("Cars drop-down");
    cy.screenshot("Full page screenshot");

    // Here are given different solutions how to get the length of array of elements in Cars dropdown
    // Next 2 lines of code do exactly the same!
    cy.get("#cars").children().should("have.length", 4);
    cy.get("#cars").find("option").should("have.length", 4);

    //Check  that first element in the dropdown has text Volvo
    cy.get("#cars").find("option").eq(0).should("have.text", "Volvo");

    // Advanced level how to check the content of the Cars dropdown
    cy.get("#cars")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq(["volvo", "saab", "opel", "audi"]);
      });
  });

  // Create test similar to previous one

  it("Favorite animal dropdown is correct", () => {
    cy.get("#animal").children().should("have.length", 6);

    // Advanced level how to check the content of the Animals dropdown
    cy.get("#animal")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq([
          "dog",
          "cat",
          "snake",
          "hippo",
          "cow",
          "mouse",
        ]);
      });
  });
});

function inputValidData(username) {
  cy.log("Username will be filled");
  cy.get('input[data-testid="user"]').type(username);
  cy.get("#email").type("Siimo@test.ee");
  cy.get('[data-cy="name"]').type("Siimo");
  cy.get("#lastName").type("Vumba");
  cy.get('[data-testid="phoneNumberTestId"]').type("1122334455");
  cy.get("#password").type("Siimo123");
  cy.get("#confirm").type("Siimo123");
  cy.get("h2").contains("Password").click();
}
