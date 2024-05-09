
 
describe('Search Pet', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/search');
  });

  it('Search pet using search bar', () => {
    cy.get('[test-id="search-pet-bar"]').type('dog');
    cy.get('[test-id="search-bar"]').should('have.value', 'dog');
  });



});