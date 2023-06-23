/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const baseUrl = "http://localhost:3000";
describe('Form Auto-Complete', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      cy.window().then((win) => {
        win.localStorage.clear();
      });
  
      cy.visit(baseUrl);
    });
  
    it('should save form data to localStorage on submit', () => {
      // Fill out form
      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('#phone').type('555-555-5555');
  
      // Submit form
      cy.get('input[type="button"]').click();
  
      // Check that form data was saved to localStorage
      cy.window().then((win) => {
        const forms = JSON.parse(win.localStorage.getItem('forms'));
        expect(forms).to.have.length(1);
        expect(forms[0]).to.deep.equal({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-555-5555'
        });
      });
    });
  
    it('should auto-fill form with previous data on page load', () => {
      // Save form data to localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('forms', JSON.stringify([{
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '123-456-7890'
        }]));
      });
  
      // Reload page
      cy.visit(baseUrl);
  
      // Check that form is auto-filled
      cy.get('#name').should('have.value', 'Jane Doe');
      cy.get('#email').should('have.value', 'jane@example.com');
      cy.get('#phone').should('have.value', '123-456-7890');
    });
  });
  