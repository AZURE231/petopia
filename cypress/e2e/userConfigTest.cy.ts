//  describe('Update User infomation', () => {
//     beforeEach(() => {
//         cy.login('mhung.contact@gmail.com', '123456789');
//         cy.visit('http://localhost:3000/user');
//       });

//       it('Submit Update User information when missing street field - Alert notify user', () => {
//         cy.get('[test-id=show-edit-button]').click();
//         cy.get('[test-id=user-update-form]').should('be.visible');
//         cy.get('[test-id=user-profile-street-input]').clear();  
//         cy.get('[test-id="user-update-button"]').click();
//         cy.get('[test-id=user-update-alert]').should('be.visible').should('contain.text', 'Thất bại');
//         cy.get('[test-id=alert-ok]').click();
        
//       }
//     );

//     it('Submit Update User information when missing phone field - Alert notify user', () => {
//         cy.get('[test-id=show-edit-button]').click();
//         cy.get('[test-id=user-update-form]').should('be.visible');
//         cy.get('[test-id=user-profile-phone-input]').clear();  
//         cy.get('[test-id="user-update-button"]').click();
//         cy.get('[test-id=user-update-alert]').should('be.visible').should('contain.text', 'Thất bại');
//         cy.get('[test-id=alert-ok]').click();
        
//       }
//     );

//     it('Submit Update User information when missing first name field - Alert notify user', () => {
//       cy.get('[test-id=show-edit-button]').click();
//       cy.get('[test-id=user-update-form]').should('be.visible');
//       cy.get('[test-id=user-profile-first-name-input]').clear();
//       cy.get('[test-id="user-update-button"]').click();
//       cy.get('[test-id=user-update-alert]').should('be.visible').should('contain.text', 'Thất bại');
//       cy.get('[test-id=alert-ok]').click();
      
//     }
//   );

//   it('Submit Update User information when missing last name field - Alert notify user', () => {
//     cy.get('[test-id=show-edit-button]').click();
//     cy.get('[test-id=user-update-form]').should('be.visible');
//     cy.get('[test-id=user-profile-last-name-input]').clear();
//     cy.get('[test-id="user-update-button"]').click();
//     cy.get('[test-id=user-update-alert]').should('be.visible').should('contain.text', 'Thất bại');
//     cy.get('[test-id=alert-ok]').click();
//   }
// );

//     it('Update User infomation - OK', () => {
//         cy.get('[test-id=show-edit-button]').click();
//         cy.get('[test-id=user-update-form]').should('be.visible');
//         cy.get('[test-id=user-profile-first-name-input]').clear().type('First');
//         cy.get('[test-id=user-profile-last-name-input]').clear().type('Last');
//         cy.get('[test-id=user-profile-phone-input]').clear().type('123456789');
//         cy.get('[test-id=province-input-dropdown]').click();
//         cy.get('[test-id="dropdown-option"]').contains('Hà Nội').click();
//         cy.get('[test-id=district-input-dropdown]').click();
//         cy.get('[test-id="dropdown-option"]').contains('Ba Đình').click();
//         cy.get('[test-id=ward-input-dropdown]').click();
//         cy.get('[test-id="dropdown-option"]').contains('Cống Vị').click();  
//         cy.get('[test-id=user-profile-street-input]').clear().type('69');  
//         cy.get('[test-id="user-update-button"]').click();
//         cy.get('[test-id=user-update-alert]').should('be.visible');
//         cy.get('[test-id=alert-ok]').click();
        
//       }
//     );
// });


describe('Update User infomation', () => {
  beforeEach(() => {
      cy.login('mhung.contact@gmail.com', '123456789');
      cy.visit('http://localhost:3000/user');
    });

    it('Submit form to become Partner - OK', () => {
      cy.get('[test-id=show-upgrade-button]').click();
      cy.get('[test-id=user-upgrade-form]').should('be.visible');
      // cy.get('[test-id=org-name]').type('Org Name');
      // cy.get('[test-id=org-owner-name]').type('Owner Name');
      // cy.get('[test-id=org-tax-code]').type('123456789');
      // cy.get('[test-id=org-website]').type('test.org.com');
      // cy.get('[test-id=org-phone]').type('123456789');
      // cy.get('[test-id=org-address]').type('69');
      // cy.get('[test-id=org-mission]').type('Description');
      // cy.get('[test-id="dropdown-option"]').contains('Hà Nội').click();
      // cy.get('[test-id=district-input-dropdown]').click();
      // cy.get('[test-id="dropdown-option"]').contains('Ba Đình').click();
      // cy.get('[test-id=ward-input-dropdown]').click();
      // cy.get('[test-id="dropdown-option"]').contains('Cống Vị').click();  
      // cy.get('[test-id="org-type"]').click();
      // cy.get('option').contains('Cá nhân').click();    
    }
  );
});

