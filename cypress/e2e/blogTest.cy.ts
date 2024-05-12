//use cypress config
import {
  BLOG_CATEGORIES,
  KEYWORDS,
  ORG_ACCOUNT,
  PET_INFO,
  RESOLUTION,
} from '../support/constant';

describe('Blog page browsing', () => {
  beforeEach(() => {
    // cy.login(ORG_ACCOUNT.EMAIL, ORG_ACCOUNT.PASSWORD);
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.login(ORG_ACCOUNT.EMAIL, ORG_ACCOUNT.PASSWORD);
    cy.visit('http://localhost:3000/blog');
  });

  // it('Blog card directs to the right blog page - OK', () => {
  //   let blogTitleOnCard: string;
  //   let blogTitleOnPage: string;

  //   // Get the title of the blog on the card
  //   cy.get('[test-id=blog-card-0-title]')
  //     .invoke('text')
  //     .then((text) => {
  //       blogTitleOnCard = text.trim();
  //     });
  //   cy.get('[test-id=blog-card-0]').click();
  //   // Get the title of the blog on the page
  //   cy.get('[test-id=blog-page-title]')
  //     .invoke('text')
  //     .then((text) => {
  //       blogTitleOnPage = text.trim();
  //       // Compare the titles
  //       expect(blogTitleOnPage).to.equal(blogTitleOnCard);
  //     });
  // });

  it('Only blogs about HEALTH show when choose filter option', () => {
    cy.get('[test-id=blog-category-filter-option]')
      .contains(BLOG_CATEGORIES.HEALTH)
      .click();
    cy.get('[test-id=blog-category-tag]').should(
      'contain.text',
      BLOG_CATEGORIES.HEALTH
    );
  });

  it('Only blogs about TRAINING show when choose filter option', () => {
    cy.get('[test-id=blog-category-filter-option]')
      .contains(BLOG_CATEGORIES.TRAINING)
      .click();
    cy.get('[test-id=blog-category-tag]').should(
      'contain.text',
      BLOG_CATEGORIES.TRAINING
    );
  });

  it('Only blogs about PRODUCT show when choose filter option', () => {
    cy.get('[test-id=blog-category-filter-option]')
      .contains(BLOG_CATEGORIES.PRODUCT)
      .click();
    cy.get('[test-id=blog-category-tag]').should(
      'contain.text',
      BLOG_CATEGORIES.PRODUCT
    );
  });

  it('Only blogs about ART show when choose filter option', () => {
    cy.get('[test-id=blog-category-filter-option]')
      .contains(BLOG_CATEGORIES.ART)
      .click();
    cy.get('[test-id=blog-category-tag]').should(
      'contain.text',
      BLOG_CATEGORIES.ART
    );
  });
});
