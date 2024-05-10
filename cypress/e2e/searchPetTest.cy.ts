
 //use cypress config

import { PET_INFO } from "../support/constant";


describe('Search Pet - Filterbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/search');
  });

  // it('Search pet using search bar', () => {
  //   cy.get('[test-id="search-pet-bar"]').type('dog');
  //   cy.get('[test-id="search-bar"]').should('have.value', 'dog');
  // });

  it('Show the filter options when clicked - OK', () => {
    cy.get('button').contains('Loài').click(); // Clicks on the 'Species' filter button
    cy.get('label').contains(PET_INFO.SPECIES); // Clicks on the 'Dog' filter checkbox
    cy.get('button').contains('Kích thước').click(); // Clicks on the 'Size' filter button
    cy.get('label').contains(PET_INFO.SIZE);
    cy.get('button').contains('Màu sắc').click(); // Clicks on the 'Color' filter button
    cy.get('label').contains(PET_INFO.COLOR);
  });

  // it('Pet list should be filtered according to filter bar - OK', () => {
  //   cy.get('button').contains('Loài').click(); // Clicks on the 'Species' filter button
  //   cy.get('label').contains('Chó').click(); // Clicks on the 'Dog' filter checkbox
  //   cy.get('button').contains('Kích thước').click(); // Clicks on the 'Size' filter button
  //   cy.get('label').contains('Nhỏ').click();
  //   cy.get('button').contains('Màu sắc').click(); // Clicks on the 'Color' filter button
  //   cy.get('label').contains('Đen').click();

  //   cy.get('div.pet-card').each(($card) => {
  //     cy.wrap($card).within(() => {
  //       cy.get('.pet-species').should('contain', 'Cat'); // Checks if the species is Cat
  //       cy.get('.pet-size').should('contain', 'Medium'); // Checks if the size is Medium
  //     });
  //   });
  // });

  




});