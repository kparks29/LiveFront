describe("Navigation Redirects", () => {
  it("should redirect from '/' to '/events'", () => {
    cy.visit('/')

    cy.url().should('include', '/events')

    cy.get('h1').should('contain', 'Events')
  })
})