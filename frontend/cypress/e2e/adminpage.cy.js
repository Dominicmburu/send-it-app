/// <reference types='Cypress'/>
describe('Create parcel', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:5173/admin-dashboard')
    })

    it('Show a link to view all parcels',()=>{
        cy.get('[data-cy="view-all-parcels"]').contains('View all parcels')
    })
    it('should create a parcel with correct details', () => {
        cy.get('data-cy="open-create-parcel-modal"').click()
        cy.get('[data-cy="parcel-id"]').type('1');
        // cy.get('[data-cy="sender"]').type('31142133')
        cy.get('[data-cy="receiver"]').type('23222245')
        cy.get('[data-cy="pick-up-location"]').type('Canada')
        cy.get('[data-cy="destination"]').type('Kisumu')
        cy.get('[data-cy="status"]').select('pending')
        cy.get('[data-cy="create-parcel-btn"]').click()
    })
})
