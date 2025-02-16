/// <reference types="Cypress" />

describe('ParcelDetails Component', () => {
    beforeEach(() => {
      cy.mount(<ParcelDetails />);
    });
  
    it('should display the correct parcel ID', () => {
      cy.get('.pl').first().should('contain', 'KE432993');
    });
  
    it('should display the correct sender and receiver names', () => {
      cy.contains('Sender:').next('strong').should('contain', 'John Doe');
      cy.contains('Receiver:').next('strong').should('contain', 'Jane Doe');
    });
  
    it('should display the correct pickup and destination locations', () => {
      cy.contains('Pick-up Location:').next('strong').should('contain', 'Lagos');
      cy.contains('Destination:').next('strong').should('contain', 'Abuja');
    });
  
    it('should display the correct parcel status with the right icon', () => {
      cy.get('.status').within(() => {
        cy.get('.delivered-icon').should('exist');
        cy.contains('Delivered');
      });
    });
  
    it('should have action buttons present', () => {
      cy.get('.actions-update').should('contain', 'Update Status');
      cy.get('.actions-delete').should('contain', 'Delete');
      cy.get('.actions-map').should('contain', 'Map');
    });
  });
  