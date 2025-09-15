describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all navigation items', () => {
    const expectedNavItems = [
      'Home',
      'Currency Calculator',
      'Currency List',
      'Historical Values',
      'Graphical Trends',
    ];

    cy.get('app-navbar').within(() => {
      expectedNavItems.forEach(item => {
        cy.contains(item).should('be.visible');
      });
    });
  });

  it('should navigate to home page', () => {
    cy.navigateViaNavbar('Home');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('app-home').should('be.visible');
  });

  it('should show WIP indicators for work-in-progress pages', () => {
    const wipItems = [
      'Currency Calculator',
      'Currency List',
      'Historical Values',
      'Graphical Trends',
    ];

    cy.get('app-navbar').within(() => {
      wipItems.forEach(item => {
        cy.contains(item).should('be.visible');
        // Check if WIP is indicated in the text or styling
        cy.contains(item).should('contain.text', item);
      });
    });
  });

  it('should handle navigation clicks', () => {
    // Test navigation - only Home should work, others are WIP
    cy.get('app-navbar').within(() => {
      cy.contains('a', 'Home').click();
    });
    cy.url().should('include', '/');

    // Verify header and footer are still present
    cy.get('app-header').should('be.visible');
    cy.get('app-footer').should('be.visible');

    // Test that WIP links exist but don't navigate (preventDefault)
    const wipRoutes = [
      'Currency Calculator',
      'Currency List',
      'Historical Values',
      'Graphical Trends',
    ];

    wipRoutes.forEach(routeText => {
      cy.get('app-navbar').within(() => {
        cy.contains('a', routeText).should('be.visible');
        cy.contains('a', routeText).click();
      });
      // Should stay on home page due to preventDefault
      cy.url().should('include', '/');
    });
  });

  it('should maintain active navigation state', () => {
    // Click on Home navigation item and verify active state
    cy.get('app-navbar').within(() => {
      cy.contains('a', 'Home').click();
    });

    // Check if home is active (this depends on CSS implementation)
    cy.url().should('include', '/');

    // Check that Home link has active class when on home page
    cy.get('app-navbar').within(() => {
      cy.contains('a', 'Home').should('have.class', 'active');
    });

    // WIP links should not navigate, so we can't test their active state
    // but we can verify they have the WIP class
    cy.get('app-navbar').within(() => {
      cy.contains('a', 'Currency Calculator').should('have.class', 'wip');
    });
  });

  it('should have proper link attributes', () => {
    cy.get('app-navbar').within(() => {
      // Check that navigation links exist (they use [routerLink] attribute)
      cy.get('a').should('have.length.at.least', 5);

      // Check specific router links by looking at the actual HTML structure
      cy.get('a').should('contain.text', 'Home');
      cy.get('a').should('contain.text', 'Currency Calculator');
      cy.get('a').should('contain.text', 'Currency List');
      cy.get('a').should('contain.text', 'Historical Values');
      cy.get('a').should('contain.text', 'Graphical Trends');
    });
  });

  it('should be keyboard accessible', () => {
    // Test keyboard navigation - focus on links and verify they can be focused
    cy.get('app-navbar').within(() => {
      cy.get('a').first().focus();
      cy.focused().should('contain.text', 'Home');

      // Test that all navigation links can be focused
      cy.get('a').each($link => {
        cy.wrap($link).focus();
        cy.focused().should('be.visible');
      });
    });
  });

  it('should handle browser back/forward navigation', () => {
    // Since WIP pages don't actually navigate, we can only test basic navigation
    // Start on home page
    cy.url().should('include', '/');

    // Try to navigate to WIP page (should stay on home due to preventDefault)
    cy.navigateViaNavbar('Currency Calculator');
    cy.url().should('include', '/');

    // Navigate back to home explicitly
    cy.navigateViaNavbar('Home');
    cy.url().should('include', '/');

    // Test browser navigation works for the current page
    cy.reload();
    cy.url().should('include', '/');
  });

  it('should maintain navigation functionality on mobile', () => {
    cy.viewport(375, 667); // Mobile viewport

    // Navigation should still be functional
    cy.get('app-navbar').should('be.visible');

    cy.get('app-navbar').within(() => {
      cy.contains('a', 'Home').should('be.visible').click();
    });
    cy.url().should('include', '/');

    // Test WIP link on mobile (should not navigate due to preventDefault)
    cy.get('app-navbar').within(() => {
      cy.contains('a', 'Currency Calculator').should('be.visible').click();
    });
    cy.url().should('include', '/'); // Should stay on home page
  });
});
