import { NORMAL_ACCOUNT } from "../support/constant";

const petImg = 'pet_img.jpg'
const petImg2 = 'pet_img2.jpg'
const petImg3 = 'pet_img3.jpg'
 
describe('Give Pet', () => {
  beforeEach(() => {
    cy.login(NORMAL_ACCOUNT.EMAIL, NORMAL_ACCOUNT.PASSWORD);
    cy.wait(500);
    cy.visit('http://localhost:3000/give-pet');
  });

  it('Upload a pet image - OK', () => {
  
    cy.get('[test-id=givepet-dropzone]').attachFile(petImg);

    cy.get('[test-id=show-images-dropzone]').should('have.length', 1);

  
  });

  it('Delete a pet image - OK', () => {


    cy.get('[test-id=givepet-dropzone]').attachFile(petImg);

    cy.get('[test-id=show-images-dropzone]').should('have.length', 1);

    cy.get('[test-id=delete-image-dropzone]').click();

    cy.get('[test-id=show-images-dropzone]').should('not.exist');
  });

  it('Give a pet - OK', () => {
    cy.get('[test-id=givepet-dropzone]').attachFile(petImg);
    cy.get('[test-id=next-button-form]').click(); // THIS IS WHERE THE ERROR OCCURS
    // cy.get('[test-id=pet-name-give-form]').type('Test Pet', {force:true});
    // cy.get('select').contains('Chọn Loài').click();
    // cy.get('select').contains('Chó').click();
    // cy.get('select').contains('Chọn Giới tính').click({force:true});
    // cy.get('select').contains('Đực').click({force:true});
    // cy.get('select').contains('Chọn Màu sắc').click({force:true});
    // cy.get('select').contains('Đen').click({force:true});
    // cy.get('select').contains('Chọn Kích thước').click({force:true});
    // cy.get('select').contains('Nhỏ').click({force:true});
    // cy.get('select').contains('Chọn Độ tuổi').click({force:true});
    // cy.get('select').contains('Dưới 1 năm').click({force:true});
    // cy.get('select').contains('Chọn Tiêm chủng').click({force:true});
    // cy.get('select').contains('Đã tiêm').click({force:true});
    // cy.get('select').contains('Chọn Triệt sản').click({force:true});
    // cy.get('select').contains('Chưa triệt sản').click({force:true});
    // cy.get('select').contains('Không rõ').click({force:true});
    // cy.get('[test-id=dropdown-option]').contains('Shiba Inu').click({force:true});
    // cy.get('[test-id=pet-description-give-form]').type('Test Pet Description', {force:true});
    // cy.get('[test-id=next-button-form]').click();
    // cy.get('[test-id=check-box-give-form]').click({force:true});
    // cy.get('[test-id=next-button-form]').click();
    // cy.url().should('include', '/pet/');
    // cy.get('[test-id=pet-profile-name]').should('contain', 'Test Pet');
  });

});