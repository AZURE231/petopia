// cypress/support/index.d.ts


declare namespace Cypress {
    interface Chainable {
     login(email: string, password: string): Chainable<void>
    }
  }
  
  