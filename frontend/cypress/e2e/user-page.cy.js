// Test Cases for UserPage Component

// 1. Verify that the Navbar is rendered correctly.
// 2. Verify that the "Create a parcel" button is visible and clickable.
// 3. Verify that clicking the "Create a parcel" button opens the parcel creation modal.
// 4. Verify that the modal contains input fields for receiver, pickup location, and destination.
// 5. Verify that submitting the form with valid inputs triggers an API call and updates the parcels list.
// 6. Verify that clicking the "Cancel" button in the modal closes the modal.
// 7. Verify that sent parcels are displayed correctly if available.
// 8. Verify that received parcels are displayed correctly if available.
// 9. Verify that the "View Map" link is present for each parcel and navigates correctly.
// 10. Verify that an error message is displayed when API requests fail.

// Cypress Test Code

describe('UserPage Component', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:5000/api/parcels', { fixture: 'parcels.json' }).as('getParcels');
      cy.intercept('GET', 'http://localhost:5000/api/user/all', { fixture: 'users.json' }).as('getUsers');
      cy.visit('/user');
    });
  
    it('should render the Navbar', () => {
      cy.get('.navbar-wrapper').should('exist');
    });
  
    it('should display the "Create a parcel" button', () => {
      cy.get('.btn-primary').should('be.visible').click();
      cy.get('.modal-overlay').should('exist');
    });
  
    it('should open and close the parcel creation modal', () => {
      cy.get('.btn-primary').click();
      cy.get('.modal-overlay').should('exist');
      cy.get('.cancel-button').click();
      cy.get('.modal-overlay').should('not.exist');
    });
  
    it('should create a parcel successfully', () => {
      cy.get('.btn-primary').click();
      cy.get('select').select('1'); // Select a receiver
      cy.get('input[placeholder="Pickup Location"]').type('Nairobi');
      cy.get('input[placeholder="Destination"]').type('Mombasa');
      cy.intercept('POST', 'http://localhost:5000/api/parcels', {}).as('createParcel');
      cy.get('.create-parcel-button').click();
      cy.wait('@createParcel');
      cy.get('.modal-overlay').should('not.exist');
    });
  
    it('should display sent and received parcels', () => {
      cy.wait('@getParcels');
      cy.get('.sent-orders .parcel-card').should('have.length.greaterThan', 0);
      cy.get('.received-orders .parcel-card').should('have.length.greaterThan', 0);
    });
  
    it('should navigate to the correct map URL when "View Map" is clicked', () => {
      cy.get('.actions a').first().should('have.attr', 'href').and('include', '/map');
    });
  
    it('should display an error message when API fails', () => {
      cy.intercept('GET', 'http://localhost:5000/api/parcels', { statusCode: 500 }).as('getParcelsFail');
      cy.visit('/user');
      cy.wait('@getParcelsFail');
      cy.contains('Failed to fetch parcels').should('be.visible');
    });
  });
  