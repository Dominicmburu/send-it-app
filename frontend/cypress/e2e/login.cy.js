/// <reference types="Cypress"/>

describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/login");
  });

  it("should load the login page", () => {
    cy.get("[data-cy='login-title']").should("contain", "Login");
  });

  it("should have a login form with required fields", () => {
    cy.get('[data-cy="username"]').should("be.visible");
    cy.get('[data-cy="password"]').should("be.visible");
    cy.get('[data-cy="login-btn"]')
      .should("be.visible")
      .and("contain", "Login");
  });

  it("should successfully log in with valid credentials", () => {
    it("Intercept and make a mock response", () => {
      cy.intercept("GET", "http://localhost:5000/api/auth/login", {
        statusCode: 200,
        body: { email: "jysonmuchiri@gmail.com" },
      }).as("getUser");

      cy.wait("@getUser").then((interception) => {
        expect(interception.response.body.email).to.eq(
          "jysonmuchiri@gmail.com"
        );
      });
    });
  });

  it("should show an error for incorrect credentials", () => {
    cy.get('[data-cy="username"]').type("this@email.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="login-btn"]').click();
    cy.get(".error-message").should("contain", "Invalid email or password");
  });

  it("should show an error for invalid email format", () => {
    cy.get('[data-cy="username"]').type("fake-email");
    cy.get('[data-cy="password"]').type("sdfsdfs");
    cy.get('[data-cy="login-btn"]').click();
    cy.get(".error").contains("Invalid credentials. Please try again.");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('[data-cy="login-btn"]').click();
    cy.get("[data-cy='error-message']").contains("All fields are required.");
  });

  it("Show a link to sign up", () => {
    cy.get('p').contains(
      "Have no account? SignUp"
    );
  });
});







/// <reference types="cypress" />

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should render the login form", () => {
    cy.get("[data-cy=login-title]").should("contain", "Login");
    cy.get("[data-cy=username]").should("exist");
    cy.get("[data-cy=password]").should("exist");
    cy.get("[data-cy=login-btn]").should("exist");
  });

  it("should show error on failed login", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginRequest");
    
    cy.get("[data-cy=username]").type("wronguser");
    cy.get("[data-cy=password]").type("wrongpass");
    cy.get("[data-cy=login-btn]").click();
    cy.wait("@loginRequest");
    
    cy.contains("Invalid credentials. Please try again.").should("be.visible");
  });

  it("should login successfully and redirect user", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/login", {
      statusCode: 200,
      body: {
        token: "valid.token.here",
      },
    }).as("loginRequest");

    cy.window().then((win) => {
      cy.stub(win, "jwtDecode").returns({ user_id: "123", role: "user" });
    });

    cy.get("[data-cy=username]").type("testuser");
    cy.get("[data-cy=password]").type("testpass");
    cy.get("[data-cy=login-btn]").click();
    cy.wait("@loginRequest");

    cy.url().should("include", "/user-dashboard");
  });

  it("should login successfully and redirect admin", () => {
    cy.intercept("POST", "http://localhost:5000/api/auth/login", {
      statusCode: 200,
      body: {
        token: "valid.token.here",
      },
    }).as("loginRequest");

    cy.window().then((win) => {
      cy.stub(win, "jwtDecode").returns({ user_id: "456", role: "admin" });
    });

    cy.get("[data-cy=username]").type("adminuser");
    cy.get("[data-cy=password]").type("adminpass");
    cy.get("[data-cy=login-btn]").click();
    cy.wait("@loginRequest");

    cy.url().should("include", "/admin-dashboard");
  });
});
