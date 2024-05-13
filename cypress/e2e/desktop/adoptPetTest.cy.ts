import {
  KEYWORDS,
  NORMAL_ACCOUNT,
  OWNED_PET_ID,
  PET_INFO,
  RESOLUTION,
} from '../../support/constant';

const random = Math.floor(Math.random() * 10);

describe('Adopt Pet', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_HEIGHT, RESOLUTION.PC_WIDTH);
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
    cy.visit('http://localhost:3000/search');
  });

  it('Adopt pet successfully - OK', () => {
    //random number between 0 and 9
    cy.get('[test-id=pet-card-' + random + ']').click();
    cy.get('[test-id=adopt-pet-button]').click();
    cy.get('[test-id=adopt-form]').should('be.visible');
    cy.get('[test-id=adopt-form-note]').clear().type(PET_INFO.DESCRIPTION);
    cy.get('[test-id=adopt-form-submit]').click();
    cy.get('[test-id=adopt-form-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.SUCCESS);
  });

  it('Send adopt again on the same pet - Fail alert', () => {
    cy.get('[test-id=pet-card-' + random + ']').click();
    cy.get('[test-id=adopt-pet-button]').click();
    cy.get('[test-id=alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });

  it('Send adopt application for already owmned pet - Not possible', () => {
    cy.visit('http://localhost:3000/pet/' + OWNED_PET_ID);
    cy.get('[test-id=adopt-pet-button]').should('not.be.visible');
  });

  
});
