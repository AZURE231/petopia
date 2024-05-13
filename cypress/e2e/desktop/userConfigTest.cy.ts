import {
  KEYWORDS,
  NORMAL_ACCOUNT,
  ORG_INFO,
  RESOLUTION,
  USER_INFO,
} from '../../support/constant';

describe('Update User infomation', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
    cy.visit('http://localhost:3000/user');
    cy.get('[test-id=show-edit-button]').click();
  });

  it('Submit Update User information when missing street field - Fail Alert', () => {
    cy.get('[test-id=user-profile-street-input]').clear();
    cy.get('[test-id="user-update-button"]').click();
    cy.get('[test-id=user-update-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
    cy.get('[test-id=alert-ok]').click();
  });

  it('Submit Update User information when missing phone field - Fail Alert', () => {
    cy.get('[test-id=user-profile-phone-input]').clear();
    cy.get('[test-id="user-update-button"]').click();
    cy.get('[test-id=user-update-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
    cy.get('[test-id=alert-ok]').click();
  });

  it('Submit Update User information when missing first name field - Fail Alert', () => {
    cy.get('[test-id=user-profile-first-name-input]').clear();
    cy.get('[test-id="user-update-button"]').click();
    cy.get('[test-id=user-update-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
    cy.get('[test-id=alert-ok]').click();
  });

  it('Submit Update User information when missing last name field - Fail Alert', () => {
    cy.get('[test-id=user-profile-last-name-input]').clear();
    cy.get('[test-id="user-update-button"]').click();
    cy.get('[test-id=user-update-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
    cy.get('[test-id=alert-ok]').click();
  });

  it('Update User infomation - OK', () => {
    cy.get('[test-id=user-profile-first-name-input]')
      .clear()
      .type(USER_INFO.FIRST_NAME);
    cy.get('[test-id=user-profile-last-name-input]')
      .clear()
      .type(USER_INFO.LAST_NAME);
    cy.get('[test-id=user-profile-phone-input]').clear().type(USER_INFO.PHONE);
    cy.get('[test-id=province-input-dropdown]').click();
    cy.get('[test-id="dropdown-option"]').contains(USER_INFO.PROVINCE).click();
    cy.get('[test-id=district-input-dropdown]').click();
    cy.get('[test-id="dropdown-option"]').contains(USER_INFO.DISTRICT).click();
    cy.get('[test-id=ward-input-dropdown]').click();
    cy.get('[test-id="dropdown-option"]').contains(USER_INFO.WARD).click();
    cy.get('[test-id=user-profile-street-input]')
      .clear()
      .type(USER_INFO.STREET);
    cy.get('[test-id="user-update-button"]').click();
    cy.get('[test-id=user-update-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.SUCCESS);
    cy.get('[test-id=alert-ok]').click();
  });
});

describe('Upgrade to Partner', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
    cy.visit('http://localhost:3000/user');
  });

  it('Submit form when missing field - Fail Alert', () => {
    cy.get('[test-id=show-upgrade-button]').click();
    cy.get('[test-id=org-upgrade-form]').should('be.visible');
    cy.get('i').contains(KEYWORDS.TERMS).click();
    cy.get('[test-id=org-terms-tickbox]').click();
    cy.get('[test-id=org-upgrade-button]').click();
    cy.get('[test-id=org-name]').type(ORG_INFO.NAME);
    cy.get('[test-id=org-owner-name]').type(ORG_INFO.OWNER_NAME);
    cy.get('[test-id=org-tax-code]').type(ORG_INFO.TAX_CODE);
    cy.get('[test-id=org-website]').type(ORG_INFO.WEBSITE);
    cy.get('[test-id=org-phone]').type(ORG_INFO.PHONE);
    cy.get('[test-id=org-street]').type(ORG_INFO.ADDRESS);
    cy.get('[test-id=org-mission]').type(ORG_INFO.MISSION);
    cy.get('[test-id="org-type"]').select(ORG_INFO.TYPE);
    cy.get('i').contains(KEYWORDS.TERMS).click();
    cy.get('[test-id=org-terms-tickbox]').click();
    cy.get('[test-id=org-upgrade-button]').click();
    cy.get('[test-id=org-upgrade-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });

  it('Submit form to become Partner - OK', () => {
    cy.get('[test-id=show-upgrade-button]').click();
    cy.get('[test-id=org-upgrade-form]').should('be.visible');
    cy.get('[test-id=org-name]').type(ORG_INFO.NAME);
    cy.get('[test-id=org-owner-name]').type(ORG_INFO.OWNER_NAME);
    cy.get('[test-id=org-tax-code]').type(ORG_INFO.TAX_CODE);
    cy.get('[test-id=org-website]').type(ORG_INFO.WEBSITE);
    cy.get('[test-id=org-phone]').type(ORG_INFO.PHONE);
    cy.get('[test-id=org-street]').type(ORG_INFO.ADDRESS);
    cy.get('[test-id=org-mission]').type(ORG_INFO.MISSION);
    cy.get('[test-id="province-input-dropdown"]').click();
    cy.get('[test-id="dropdown-option"]').contains(ORG_INFO.PROVINCE).click();
    cy.get('[test-id=district-input-dropdown]').click();
    cy.get('[test-id="dropdown-option"]').contains(ORG_INFO.DISTRICT).click();
    cy.get('[test-id=ward-input-dropdown]').click();
    cy.get('[test-id="dropdown-option"]').contains(ORG_INFO.WARD).click();
    cy.get('[test-id="org-type"]').select(ORG_INFO.TYPE);
    cy.get('i').contains(KEYWORDS.TERMS).click();
    cy.get('[test-id=org-terms-tickbox]').click();
    cy.get('[test-id=org-upgrade-button]').click();
    cy.get('[test-id=org-upgrade-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.SUCCESS);
    cy.get('[test-id=alert-ok]').click();
  });

  it('Already submit form to become Partner - Fail Alert', () => {
    cy.get('[test-id=show-upgrade-button]').click();
    cy.get('[test-id=already-submit-org-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });
});
