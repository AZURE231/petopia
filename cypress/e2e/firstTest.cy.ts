/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the hero section with "Nhận nuôi" and "Chia sẻ kiến thức" buttons', () => {
    cy.get('[data-testid="homepage-hero"]').should('exist');
    cy.contains('Nhận nuôi').should('exist');
    cy.contains('Chia sẻ kiến thức').should('exist');
  });

  it('should display the introduction section with the title and content', () => {
    cy.contains('Nơi từ bỏ').should('exist');
    cy.contains('trở thành yêu thương').should('exist');
    cy.contains('Tại Petopia chúng tôi đặt tâm huyết').should('exist');
  });

  it('should display the services section with adopt, receive, and blog options', () => {
    cy.contains('Các dịch vụ của chúng tôi').should('exist');
    cy.contains('Cho thú cưng').should('exist');
    cy.contains('Nhận nuôi').should('exist');
    cy.contains('Chia sẽ kiến thức').should('exist');
  });

  it('should display the adopt steps section with all steps', () => {
    cy.contains('Quy trình nhận nuôi').should('exist');
    cy.contains('Tìm boss').should('exist');
    cy.contains('Liên hệ').should('exist');
    cy.contains('Cập nhật').should('exist');
  });

  it('should have login and register buttons', () => {
    cy.contains('Đăng nhập').should('exist');
    cy.contains('Đăng kí').should('exist');
  });
});
