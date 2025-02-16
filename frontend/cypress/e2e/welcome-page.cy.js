describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173')
  })
  it('Show welcome message', () => {
    cy.get('h1').contains('Welcome')
  })
  it('should have a link to login page', ()=>{
    cy.get('Link').contains('Get Started NOW!')
  })
})