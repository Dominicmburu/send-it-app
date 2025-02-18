describe("Test signup page", () => {
  beforeEach(() => {
    // cy.visit("http://127.0.0.1:5000/api/auth/register");
    cy.visit(' http://localhost:5174/signup')
  });

  it("Should have a header with text Signup", () => {
    cy.get("[data-cy='signup-title']").contains("Sign Up");
  });

  it("Should show an error for empty input", ()=>{
    cy.get('[data-cy="signup-btn"]').click();
    cy.get('[data-cy="error"]').contains('All fields are required.')
  })
  it("should show validation errors for empty fields", () => {
    cy.get('[data-cy="signup-button"]').click();
    cy.get("[data-cy='error-message']").contains("All fields are required.");
  });

  it("Show a link to sign up", () => {
    cy.get('p').contains(
      "Already have an account? Login"
    );
  });
});
