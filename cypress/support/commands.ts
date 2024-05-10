/// <reference types="cypress" />

import 'cypress-file-upload';


Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('http://localhost:3000');
    cy.get('[test-id=login-button]').click();
    cy.get('[test-id=login-email-input]').type(email);
    cy.get('[test-id=login-password-input]').type(password);
    cy.get('button').contains('Đăng nhập').click();
    cy.wait(1500);
  });

Cypress.config({
  viewportWidth: 1280,
  viewportHeight: 720,
})



  
