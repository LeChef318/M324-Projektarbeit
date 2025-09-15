describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page content', () => {
    cy.get('app-home').should('be.visible');
  });

  it('should display all feature cards', () => {
    const expectedFeatures = [
      'Daily Updated Exchange Rates (WIP)',
      '30 Major World Currencies (WIP)',
      'Instant Conversion (WIP)',
      'Exchange Rate History (WIP)',
      'Interactive Currency Graphs (WIP)',
    ];

    expectedFeatures.forEach(feature => {
      cy.get('app-home').should('contain.text', feature);
    });
  });

  it('should display feature icons', () => {
    const expectedIcons = ['💱', '🌍', '🔄', '📊', '📈'];

    expectedIcons.forEach(icon => {
      cy.get('app-home').should('contain.text', icon);
    });
  });

  it('should have proper feature card structure', () => {
    // Check if feature cards are properly structured
    cy.get('app-home').within(() => {
      // Look for feature cards (exact selector depends on template)
      cy.get('.feature-card, .feature, [class*="feature"]').should(
        'have.length.at.least',
        5
      );
    });
  });

  it('should display feature descriptions', () => {
    const expectedDescriptions = [
      'Get the most current exchange rates updated daily from the European Central Bank',
      'Convert between all major world currencies including USD, EUR, GBP, JPY',
      'Lightning-fast currency calculations with swap functionality',
      'View detailed exchange rate tables and track currency trends',
      'Visualize currency trends with beautiful interactive charts',
    ];

    expectedDescriptions.forEach(description => {
      // Check for partial matches since descriptions might be truncated
      const words = description.split(' ').slice(0, 3).join(' ');
      cy.get('app-home').should('contain.text', words);
    });
  });

  it('should be responsive on different screen sizes', () => {
    const viewports = [
      [1920, 1080], // Large desktop
      [1280, 720], // Desktop
      [768, 1024], // Tablet
      [375, 667], // Mobile
    ];

    viewports.forEach(([width, height]) => {
      cy.viewport(width, height);
      cy.get('app-home').should('be.visible');

      // Features should still be visible
      cy.get('app-home').should('contain.text', 'Daily Updated Exchange Rates');
      cy.get('app-home').should('contain.text', '30 Major World Currencies');
    });
  });

  it('should have proper semantic structure', () => {
    cy.get('app-home').within(() => {
      // Check for proper heading structure
      cy.get('h1, h2, h3, .title, .heading').should('exist');
    });
  });

  it('should display WIP indicators clearly', () => {
    // All features should show WIP status
    cy.get('app-home').within(() => {
      // Check that WIP text appears in feature titles
      cy.get('.feature-title').should('contain.text', '(WIP)');
      // Count the actual number of WIP indicators
      cy.get('.feature-title').then($titles => {
        const wipCount = $titles.text().match(/\(WIP\)/g)?.length || 0;
        expect(wipCount).to.be.at.least(5);
      });
    });
  });

  it('should load quickly', () => {
    // Performance test - page should load within reasonable time
    cy.visit('/', { timeout: 10000 });
    cy.get('app-home').should('be.visible');
  });

  it('should have accessible content', () => {
    // Basic accessibility checks
    cy.get('app-home').within(() => {
      // Check for proper heading hierarchy
      cy.get('h1, h2, h3, h4, h5, h6').should('exist');
    });

    // Check for alt text on images (if any exist) - check outside of app-home
    cy.get('body').then($body => {
      const images = $body.find('img');
      if (images.length > 0) {
        cy.get('img').each($img => {
          cy.wrap($img).should('have.attr', 'alt');
        });
      }
    });
  });

  it('should maintain content integrity across page refreshes', () => {
    // Verify content persists after refresh
    cy.get('app-home').should('contain.text', 'Daily Updated Exchange Rates');

    cy.reload();

    cy.get('app-home').should('contain.text', 'Daily Updated Exchange Rates');
    cy.get('app-home').should('contain.text', '30 Major World Currencies');
  });

  it('should handle long content gracefully', () => {
    // Test content overflow and text wrapping
    cy.viewport(320, 568); // Very small mobile screen

    cy.get('app-home').should('be.visible');

    // Content should still be readable
    cy.get('app-home').should('contain.text', 'Exchange Rates');
    cy.get('app-home').should('contain.text', 'Currencies');
  });

  it('should have proper color contrast', () => {
    // Basic visual test - content should be visible
    cy.get('app-home').should('be.visible');

    // Text should be readable (this is a basic check)
    cy.get('app-home').within(() => {
      cy.get('*')
        .should('have.css', 'color')
        .and('not.equal', 'rgba(0, 0, 0, 0)');
    });
  });
});
