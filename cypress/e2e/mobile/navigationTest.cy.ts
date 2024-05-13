/// <reference types="cypress" />

import { KEYWORDS, NORMAL_ACCOUNT, RESOLUTION } from '../../support/constant';

describe('Navigation - Guest', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.MOBILE_WIDTH, RESOLUTION.MOBILE_HEIGHT);
    cy.visit('http://localhost:3000');
  });

  it('Navigate to Home page - OK', () => {
    cy.get('[test-id=home-link]').click();
    cy.url().should('include', '/');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });

  it('Navigate to Search page - OK', () => {
    cy.get('[test-id=search-link]').click();
    cy.url().should('include', '/search');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });

  it('Navigate to Adopt page - Required authentication', () => {
    cy.get('[test-id=adopt-link]').click();
    cy.url().should('include', '/give-pet');
    cy.get('[test-id=authentication-layout]').should('exist');
  });

  it('Navigate to Blog page - OK', () => {
    cy.get('[test-id=blog-link]').click();
    cy.url().should('include', '/blog');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });
});

describe('Navigation - Authenticated', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
  });

  it('Navigate to Adopt page - OK', () => {
    cy.get('[test-id=adopt-link]').click();
    cy.url().should('include', '/give-pet');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });

  it('Navigate to User Profile page - OK', () => {
    cy.get('[test-id=user-picture-button]').click();
    cy.get('[test-id=user-profile-link]').click();
    cy.url().should('include', '/user');
  });

  it('Logout - OK', () => {
    cy.get('[test-id=user-picture-button]').click();
    cy.get('a').contains(KEYWORDS.LOG_OUT).click();
    cy.wait(500);
    cy.getCookie('accessTokenServer').should('not.exist');
  });
});
