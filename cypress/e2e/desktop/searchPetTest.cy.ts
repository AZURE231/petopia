//use cypress config
/// <reference types="cypress" />
import {
  KEYWORDS,
  PET_INFO,
  RESOLUTION,
} from '../../support/constant';

describe('Search Pet - Filterbar', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT );
    cy.visit('http://localhost:3000/search');
  });

  it('Show the filter options when clicked - OK', () => {
    cy.get('button').contains(KEYWORDS.SPECIES).click();
    cy.get('label').contains(PET_INFO.SPECIES);
    cy.get('button').contains(KEYWORDS.SIZE).click();
    cy.get('label').contains(PET_INFO.SIZE);
    cy.get('button').contains(KEYWORDS.COLOR).click();
    cy.get('label').contains(PET_INFO.COLOR);
    cy.get('button').contains(KEYWORDS.AGE).click();
    cy.get('label').contains(PET_INFO.AGE);
    cy.get('button').contains(KEYWORDS.SEX).click();
    cy.get('label').contains(PET_INFO.SEX);
    cy.get('button').contains(KEYWORDS.VACCINE).click();
    cy.get('label').contains(PET_INFO.VACCINE);
    cy.get('button').contains(KEYWORDS.SPAY).click();
    cy.get('label').contains(PET_INFO.SPAY);
  });

  it('Pet breed filter should be filtered according species - OK', () => {
    cy.get('button').contains(KEYWORDS.SPECIES).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.SPECIES).click();
    cy.get('button').contains(KEYWORDS.BREED).click();
    cy.get('[test-id=filter-card')
      .should('be.visible')
      .should('contain.text', PET_INFO.BREED);
  });

  it('Pet list filtered by Species - OK', () => {
    cy.get('button').contains(KEYWORDS.SPECIES).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.SPECIES).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-species"]').should(
      'contain.text',
      PET_INFO.SPECIES
    );
  });

  it('Pet list filtered by Breed - OK', () => {
    cy.get('button').contains(KEYWORDS.SPECIES).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.SPECIES).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('button').contains(KEYWORDS.BREED).click();
    cy.get('[test-id=filter-card').contains(PET_INFO.BREED).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-breed"]').should(
      'contain.text',
      PET_INFO.BREED
    );
  });

  it('Pet list filtered by Size - OK', () => {
    cy.get('button').contains(KEYWORDS.SIZE).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.SIZE).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-size"]').should('contain.text', PET_INFO.SIZE);
  });

  it('Pet list filtered by Color - OK', () => {
    cy.get('button').contains(KEYWORDS.COLOR).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.COLOR).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-color"]').should(
      'contain.text',
      PET_INFO.COLOR
    );
  });

  it('Pet list filtered by Age - OK', () => {
    cy.get('button').contains(KEYWORDS.AGE).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.AGE).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-age"]').should(
      'contain.text',
      PET_INFO.AGE_NUMBER
    );
  });

  it('Pet list filtered by Vaccine - OK', () => {
    cy.get('button').contains(KEYWORDS.VACCINE).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.VACCINE).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-vaccine"]').should(
      'contain.text',
      PET_INFO.VACCINE
    );
  });

  it('Pet list filtered by Spay - OK', () => {
    cy.get('button').contains(KEYWORDS.SPAY).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.SPAY).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-spay"]').should('contain.text', PET_INFO.SPAY);
  });

  it('Pet list filtered by Sex - OK', () => {
    cy.get('button').contains(KEYWORDS.SEX).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id=filter-card').contains(PET_INFO.SEX).click();
    cy.get('[test-id="pet-card-0"]').should('be.visible');
    cy.get('[test-id="pet-card-0"]').click();
    cy.get('[test-id="pet-detail-sex"]').should('contain.text', PET_INFO.SEX);
  });
});
