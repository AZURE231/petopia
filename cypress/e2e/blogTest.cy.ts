//use cypress config
import {
  BLOG_CATEGORIES,
  BLOG_INFO,
  KEYWORDS,
  ORG_ACCOUNT,
  PET_INFO,
  RESOLUTION,
} from '../support/constant';

describe('Blog page browsing', () => {
  beforeEach(() => {
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.visit('http://localhost:3000/blog');
  });

  it('Blog card directs to the right blog page - OK', () => {
    let blogTitleOnCard: string;
    let blogTitleOnPage: string;

    // Get the title of the blog on the card
    cy.get('[test-id=blog-card-0-title]')
      .invoke('text')
      .then((text) => {
        blogTitleOnCard = text.trim();
      });
    cy.get('[test-id=blog-card-0]').click();
    // Get the title of the blog on the page
    cy.get('[test-id=blog-page-title]')
      .invoke('text')
      .then((text) => {
        blogTitleOnPage = text.trim();
        // Compare the titles
        expect(blogTitleOnPage).to.equal(blogTitleOnCard);
      });
  });

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

describe('Create Blog', () => {
  beforeEach(() => {
    cy.login(ORG_ACCOUNT.EMAIL, ORG_ACCOUNT.PASSWORD);
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.visit('http://localhost:3000/blog-create');
  });

  it('Create normal Blog - OK', () => {
    cy.get('[test-id=blog-title-input]').type(BLOG_INFO.TITLE);
    cy.get('[test-id=blog-category-select]').select(BLOG_INFO.CATEGORY);
    cy.get('[test-id=blog-excerpt-input]').type(BLOG_INFO.EXCERPT);
    cy.get('[test-id=image-dropzone]').attachFile(BLOG_INFO.IMAGE);
    cy.get('.ck-content[contenteditable=true]').type(BLOG_INFO.CONTENT);
    cy.get('[test-id=blog-post-button]').click();
    cy.get('[test-id=blog-create-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.SUCCESS);
    cy.get('[test-id=alert-ok]').click();
    cy.get('[test-id=blog-page-title]')
      .invoke('text')
      .then((text) => {
        const blogTitleOnPage = text.trim();
        // Compare the titles
        expect(blogTitleOnPage).to.equal(BLOG_INFO.TITLE);
      });
  });

  it('Submit Blog Create form when there are some missing field - Fail alert', () => {
    cy.get('[test-id=blog-title-input]').type(BLOG_INFO.TITLE);
    cy.get('[test-id=blog-category-select]').select(BLOG_INFO.CATEGORY);
    cy.get('[test-id=blog-excerpt-input]').type(BLOG_INFO.EXCERPT);
    cy.get('[test-id=blog-post-button]').click();
    cy.get('[test-id=blog-create-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });
});

describe('Update Blog', () => {
  beforeEach(() => {
    cy.login(ORG_ACCOUNT.EMAIL, ORG_ACCOUNT.PASSWORD);
    cy.viewport(RESOLUTION.PC_WIDTH, RESOLUTION.PC_HEIGHT);
    cy.visit('http://localhost:3000/user');
  });

  it('Update Blog - OK', () => {
    cy.get('[test-id=blog-tab]').click();
    cy.get('[test-id=blog-card-0-edit]').click();
    //random a new title
    const newTitle = BLOG_INFO.TITLE + Math.floor(Math.random() * 100);
    cy.get('[test-id=blog-title-input]').clear().type(newTitle);
    cy.get('[test-id=blog-update-button]').click();
    cy.get('[test-id=blog-create-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.SUCCESS);
    cy.get('[test-id=alert-ok]').click();
    cy.get('[test-id=blog-page-title]')
      .invoke('text')
      .then((text) => {
        const blogTitleOnPage = text.trim();
        // Compare the titles
        expect(blogTitleOnPage).to.equal(newTitle);
      });
  });

  it('Submit Update Blog form when there are some missing field  - Fail alert', () => {
    cy.get('[test-id=blog-tab]').click();
    cy.get('[test-id=blog-card-0-edit]').click();
    cy.get('.ck-content[contenteditable=true]').clear();
    cy.get('[test-id=blog-update-button]').click();
    cy.get('[test-id=blog-create-alert]')
      .should('be.visible')
      .should('contain.text', KEYWORDS.FAIL);
  });
});
