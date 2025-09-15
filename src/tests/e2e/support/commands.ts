/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check if an element contains text
       * @example cy.shouldContainText('selector', 'expected text')
       */
      shouldContainText(selector: string, text: string): Chainable<Element>;

      /**
       * Custom command to wait for Angular to be ready
       * @example cy.waitForAngular()
       */
      waitForAngular(): Chainable<Element>;

      /**
       * Custom command to navigate using the navbar
       * @example cy.navigateViaNavbar('Home')
       */
      navigateViaNavbar(linkText: string): Chainable<Element>;

      /**
       * Custom command to simulate tab key press
       * @example cy.tab()
       */
      tab(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('shouldContainText', (selector: string, text: string) => {
  cy.get(selector).should('contain.text', text);
});

Cypress.Commands.add('waitForAngular', () => {
  cy.window().then((win: Window & typeof globalThis) => {
    return new Cypress.Promise(resolve => {
      // Wait for Angular to be ready
      const checkAngular = () => {
        if (win.ng && win.ng.getInjector) {
          resolve(win);
        } else {
          setTimeout(checkAngular, 100);
        }
      };
      checkAngular();
    });
  });
});

Cypress.Commands.add('navigateViaNavbar', (linkText: string) => {
  cy.get('app-navbar').within(() => {
    cy.contains('a', linkText).click();
  });
});

Cypress.Commands.add('tab', () => {
  cy.focused().type('{tab}');
});
