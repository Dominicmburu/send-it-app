/// <reference types="Cypress" />

describe("AllParcels Component", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/parcels", {
        statusCode: 200,
        body: [
          { id: 1, sender: "John Doe", receiver: "Jane Doe", parcel_status: "Pending" },
          { id: 2, sender: "Alice", receiver: "Bob", parcel_status: "Delivered" },
        ],
      }).as("getParcels");
  
      cy.visit("/all-parcels"); // Adjust if your route differs
    });
  
    it("should display fetched parcels correctly", () => {
      cy.wait("@getParcels");
      cy.get(".parcels-container").should("exist");
      cy.get(".parcels-container").children().should("have.length", 2);
    });
  
    it("should show an error message if fetching parcels fails", () => {
      cy.intercept("GET", "/api/parcels", { statusCode: 500 }).as("getParcelsError");
  
      cy.visit("/all-parcels");
      cy.wait("@getParcelsError");
  
      cy.get(".error-message").should("contain", "Failed to fetch parcels");
    });
  
    it("should update a parcel status to 'Delivered' when button is clicked", () => {
      cy.intercept("PATCH", "/api/parcels/1/status", {
        statusCode: 200,
      }).as("updateParcel");
  
      cy.wait("@getParcels");
  
      cy.contains("Mark as Delivered").click();
      cy.wait("@updateParcel");
  
      // Simulate new API response after update
      cy.intercept("GET", "/api/parcels", {
        statusCode: 200,
        body: [
          { id: 1, sender: "John Doe", receiver: "Jane Doe", parcel_status: "Delivered" },
          { id: 2, sender: "Alice", receiver: "Bob", parcel_status: "Delivered" },
        ],
      }).as("getUp
  







        ///




        /// <reference types="cypress" />

describe("AllParcels Component", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/parcels", {
        statusCode: 200,
        body: [
          { id: 1, sender: "John Doe", receiver: "Jane Doe", parcel_status: "Pending" },
          { id: 2, sender: "John Doe", receiver: "Jane Doe", parcel_status: "Delivered" },
          { id: 3, sender: "Johnson", receiver: "Jane", parcel_status: "Pending" }
        ],
      }).as("getParcels");
    });
  
    it("renders the AllParcels component correctly", () => {
      cy.visit("/all-parcels");
      cy.get(".parcel-overview-wrapper").should("exist");
      cy.contains("Recent parcels").should("be.visible");
    });
  
    it("displays the list of parcels", () => {
      cy.visit("/all-parcels");
      cy.wait("@getParcels");
      cy.get(".parcels-container").children().should("have.length", 3);
      cy.contains("John Doe").should("exist");
      cy.contains("Jane Doe").should("exist");
    });
  
    it("shows an error message when fetching parcels fails", () => {
      cy.intercept("GET", "/api/parcels", {
        statusCode: 500,
        body: {},
      }).as("getParcelsError");
      
      cy.visit("/all-parcels");
      cy.wait("@getParcelsError");
      cy.contains("Failed to fetch parcels").should("be.visible");
    });
  
    it("updates parcel status on button click", () => {
      cy.intercept("PATCH", "/api/parcels/1/status", {
        statusCode: 200,
      }).as("updateParcelStatus");
      
      cy.visit("/all-parcels");
      cy.wait("@getParcels");
      cy.get(".update-status-button").first().click();
      cy.wait("@updateParcelStatus");
    });
  });
  