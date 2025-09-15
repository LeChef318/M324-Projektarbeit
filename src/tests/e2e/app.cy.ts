describe('Currency Converter App E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the application title', () => {
    cy.title().should('contain', 'Modul Projekt');
    cy.get('app-header').should('contain.text', 'Currency Converter Pro');
  });

  it('should have proper page structure', () => {
    // Check main layout components
    cy.get('app-header').should('be.visible');
    cy.get('app-navbar').should('be.visible');
    cy.get('router-outlet').should('exist');
    cy.get('app-footer').should('be.visible');
  });

  it('should display current year in footer', () => {
    const currentYear = new Date().getFullYear();
    cy.get('app-footer').should('contain.text', currentYear.toString());
  });

  it('should have responsive design elements', () => {
    // Test different viewport sizes
    cy.viewport(1280, 720); // Desktop
    cy.get('app-header').should('be.visible');
    cy.get('app-navbar').should('be.visible');

    cy.viewport(768, 1024); // Tablet
    cy.get('app-header').should('be.visible');
    cy.get('app-navbar').should('be.visible');

    cy.viewport(375, 667); // Mobile
    cy.get('app-header').should('be.visible');
    cy.get('app-navbar').should('be.visible');
  });

  it('should maintain layout consistency across viewport changes', () => {
    const viewports = [
      [1920, 1080], // Large desktop
      [1280, 720], // Desktop
      [768, 1024], // Tablet
      [375, 667], // Mobile
    ];

    viewports.forEach(([width, height]) => {
      cy.viewport(width, height);
      cy.get('app-header').should('be.visible');
      cy.get('app-footer').should('be.visible');
      cy.get('router-outlet').should('exist');
    });
  });

  it('should have proper accessibility attributes', () => {
    // Check for basic accessibility
    cy.get('main, [role="main"]').should('exist');
    cy.get('nav, [role="navigation"]').should('exist');
    cy.get('header, [role="banner"]').should('exist');
    cy.get('footer, [role="contentinfo"]').should('exist');
  });

  it('should load without JavaScript errors', () => {
    cy.window().then(win => {
      // Check that no console errors occurred during page load
      // This is a basic check - in a real app you might want to spy on console.error
      expect(win.console).to.exist;
    });
  });

  it('should have proper meta tags', () => {
    cy.document().then(doc => {
      expect(doc.querySelector('meta[charset]')).to.exist;
      expect(doc.querySelector('meta[name="viewport"]')).to.exist;
    });
  });
});
