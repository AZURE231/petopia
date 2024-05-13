import {
  KEYWORDS,
  NORMAL_ACCOUNT,
  PET_INFO,
  RESOLUTION,
} from '../../support/constant';

describe('Give Pet', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
    cy.visit('http://localhost:3000/give-pet');
  });

  it('Upload a pet image - OK', () => {
    cy.get('[test-id=image-dropzone]').attachFile(PET_INFO.IMAGE_1);

    cy.get('[test-id=show-images-dropzone]').should('have.length', 1);
  });

  it('Upload multiple pet images - OK', () => {
    cy.get('[test-id=image-dropzone]').attachFile(PET_INFO.IMAGE_1);
    cy.get('[test-id=image-dropzone]').attachFile(PET_INFO.IMAGE_2);
    cy.get('[test-id=image-dropzone]').attachFile(PET_INFO.IMAGE_3);
    cy.get('[test-id=show-images-dropzone]').should('have.length', 3);
  });

  it('Delete a pet image - OK', () => {
    cy.get('[test-id=image-dropzone]').attachFile(PET_INFO.IMAGE_1);

    cy.get('[test-id=show-images-dropzone]').should('have.length', 1);

    cy.get('[test-id=delete-image-dropzone]').click();

    cy.get('[test-id=show-images-dropzone]').should('not.exist');
  });

  it('Give a pet without Pet Image - Fail Alert', () => {
    cy.get('[test-id=next-button-form]').click();
    cy.get('[test-id=pet-name-give-form]').type('Test Pet');
    cy.get('[test-id=dropdown-option-species]').select(PET_INFO.SPECIES);
    cy.get('[test-id=dropdown-option-sex]').select(PET_INFO.SEX);
    cy.get('[test-id=dropdown-option-color]').select(PET_INFO.COLOR);
    cy.get('[test-id=dropdown-option-size]').select(PET_INFO.SIZE);
    cy.get('[test-id=dropdown-option-age]').select(PET_INFO.AGE);
    cy.get('[test-id=dropdown-option-isVaccinated]').select(PET_INFO.VACCINE);
    cy.get('[test-id=dropdown-option-isSterillized]').select(PET_INFO.SPAY);
    cy.get('[test-id=dropdown-option-breed]').click();
    cy.get('[test-id="dropdown-option"]').contains(PET_INFO.BREED).click();
    cy.get('[test-id=pet-description-give-form]').type(PET_INFO.DESCRIPTION);
    cy.get('[test-id=next-button-form]').click();
    cy.get('[test-id=check-box-give-form]').click();
    cy.get('[test-id=submit-give-pet-button]').click();
    cy.get('[test-id=give-pet-form-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });

  it('Give a pet without Pet Image - Fail Alert', () => {
    cy.get('[test-id=next-button-form]').click();
    cy.get('[test-id=next-button-form]').click();
    cy.get('[test-id=check-box-give-form]').click();
    cy.get('[test-id=submit-give-pet-button]').click();
    cy.get('[test-id=give-pet-form-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });

  it('Give a pet - OK', () => {
    cy.get('[test-id=image-dropzone]').attachFile(PET_INFO.IMAGE_1);
    cy.get('[test-id=next-button-form]').click();
    cy.get('[test-id=pet-name-give-form]').type('Test Pet');
    cy.get('[test-id=dropdown-option-species]').select(PET_INFO.SPECIES);
    cy.get('[test-id=dropdown-option-sex]').select(PET_INFO.SEX);
    cy.get('[test-id=dropdown-option-color]').select(PET_INFO.COLOR);
    cy.get('[test-id=dropdown-option-size]').select(PET_INFO.SIZE);
    cy.get('[test-id=dropdown-option-age]').select(PET_INFO.AGE);
    cy.get('[test-id=dropdown-option-isVaccinated]').select(PET_INFO.VACCINE);
    cy.get('[test-id=dropdown-option-isSterillized]').select(PET_INFO.SPAY);
    cy.get('[test-id=dropdown-option-breed]').click();
    cy.get('[test-id="dropdown-option"]').contains(PET_INFO.BREED).click();
    cy.get('[test-id=pet-description-give-form]').type(PET_INFO.DESCRIPTION);
    cy.get('[test-id=next-button-form]').click();
    cy.get('[test-id=check-box-give-form]').click();
    cy.get('[test-id=submit-give-pet-button]').click();
    cy.url().should('include', '/pet');
  });
});
