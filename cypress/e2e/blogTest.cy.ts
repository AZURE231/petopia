//use cypress config
import { KEYWORDS, ORG_ACCOUNT, PET_INFO } from '../support/constant';

describe('Blog page browsing', () => {
  beforeEach(() => {
    // cy.login(ORG_ACCOUNT.EMAIL, ORG_ACCOUNT.PASSWORD);
    cy.visit('http://localhost:3000/blog');
  });



});
