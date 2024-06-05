/// <reference types="cypress" />

import {
  NORMAL_ACCOUNT,
  ORG_ACCOUNT,
  RESOLUTION,
} from '../../support/constant';

describe('Guest User', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.MOBILE_WIDTH, RESOLUTION.MOBILE_HEIGHT);
    cy.visit('http://localhost:3000');
  });

  it('Navigate to Home page - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=home-link]').click();
    cy.url().should('include', '/');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });

  it('Navigate to Search page - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=search-link]').click();
    cy.url().should('include', '/search');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });

  it('Navigate to Adopt page - Required authentication', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=adopt-link]').click();
    cy.url().should('include', '/give-pet');
    cy.get('[test-id=authentication-layout]').should('exist');
  });

  it('Navigate to Blog page - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=blog-link]').click();
    cy.url().should('include', '/blog');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });
});

describe('Authenticated - Normal User', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.MOBILE_WIDTH, RESOLUTION.MOBILE_HEIGHT);
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
  });

  it('Navigate to Adopt page - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=adopt-link]').click();
    cy.url().should('include', '/give-pet');
    cy.get('[test-id=authentication-layout]').should('not.exist');
  });

  it('Navigate to User Profile page - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=user-profile-link-mobile]').click();
    cy.url().should('include', '/user');
  });

  it('Logout - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=logout-link]').click();
    cy.wait(500);
    cy.getCookie('accessTokenServer').should('not.exist');
  });
});

describe('Authenticated - Organizaton User', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.MOBILE_WIDTH, RESOLUTION.MOBILE_HEIGHT);
    cy.login(ORG_ACCOUNT.EMAIL, ORG_ACCOUNT.PASSWORD);
  });


  it('Able to create blog - OK', () => {
    cy.visit('http://localhost:3000/user');
    cy.get('[test-id=blog-tab]').click();
    cy.get('[test-id=blog-create-card]').should('be.visible').click({force: true});
    cy.url().should('include', '/blog-create');
  });

  it('Logout - OK', () => {
    cy.get('[test-id=menu-button]').click();
    cy.get('[test-id=logout-link]').click();
    cy.wait(500);
    cy.getCookie('accessTokenServer').should('not.exist');
  });
});
