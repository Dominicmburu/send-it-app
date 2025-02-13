/// <reference type='Cypress'/>

describe('Login page', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:5173/login')
    })

    it('Should login successfully with correct credentials', ()=>{
        cy.get('[data-cy="login-email"]').type('admin.sendit@email.com')
        cy.get('[data-cy="login-password"]').type('admin1234')
        cy.get('[data-cy="login-btn"]').click()
    })

    it('Return an error if input fields are empty', ()=>{
        cy.get('[data-cy="login-btn"]').click()

        cy.contains('should.have', 'All fields are required.')
    })

    it('Should throw an error given wrong credentials', ()=>{
        const email = 'admin.sendit@email.com',
        const password = 'wrongpassword',

        cy.get('[data-cy="login-email"]').type('')
    })
})