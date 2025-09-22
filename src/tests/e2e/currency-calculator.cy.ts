describe('Currency Calculator', () => {
  beforeEach(() => {
    cy.visit('/calculator');
  });

  it('should display the currency calculator page', () => {
    cy.contains('Currency Calculator').should('be.visible');
    cy.contains('Convert currencies with real-time exchange rates').should('be.visible');
  });

  it('should have all required form elements', () => {
    // Amount input
    cy.get('input[type="number"]').should('be.visible');
    
    // Currency selects
    cy.get('select').should('have.length', 2);
    
    // Convert button
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Convert');
    
    // Swap button
    cy.get('.swap-button').should('be.visible');
  });

  it('should have default values set', () => {
    cy.get('input[type="number"]').should('have.value', '1');
    
    // Wait for currencies to load
    cy.get('select').first().should('not.be.disabled');
    cy.get('select').first().should('have.value', 'CHF');
    cy.get('select').last().should('have.value', 'EUR');
  });

  it('should allow changing the amount', () => {
    cy.get('input[type="number"]')
      .clear()
      .type('100')
      .should('have.value', '100');
  });

  it('should allow changing currencies', () => {
    // Wait for currencies to load
    cy.get('select').first().should('not.be.disabled');
    
    // Change from currency
    cy.get('select').first().select('GBP');
    cy.get('select').first().should('have.value', 'GBP');
    
    // Change to currency
    cy.get('select').last().select('JPY');
    cy.get('select').last().should('have.value', 'JPY');
  });

  it('should swap currencies when swap button is clicked', () => {
    // Wait for currencies to load
    cy.get('select').first().should('not.be.disabled');
    
    // Set initial values
    cy.get('select').first().select('EUR');
    cy.get('select').last().select('USD');
    
    // Click swap button
    cy.get('.swap-button').click();
    
    // Verify currencies are swapped
    cy.get('select').first().should('have.value', 'USD');
    cy.get('select').last().should('have.value', 'EUR');
  });

  it('should show loading state during conversion', () => {
    // Intercept currencies API call
    cy.intercept('GET', '**/currencies', {
      'CHF': 'Swiss Franc',
      'EUR': 'Euro',
      'USD': 'US Dollar'
    }).as('getCurrencies');
    
    // Intercept conversion API call to add delay
    cy.intercept('GET', '**/latest?base=CHF&symbols=EUR', {
      delay: 1000,
      fixture: 'currencies.json'
    }).as('getCurrencyRates');

    cy.visit('/calculator');
    cy.wait('@getCurrencies');
    
    cy.get('button[type="submit"]').click();
    
    // Check loading state
    cy.get('button[type="submit"]').should('contain', 'Converting...');
    cy.get('.loading-spinner').should('be.visible');
    
    // Wait for request to complete
    cy.wait('@getCurrencyRates');
    
    // Check loading state is gone
    cy.get('button[type="submit"]').should('contain', 'Convert');
  });

  it('should display conversion result', () => {
    // Mock currencies API response
    cy.intercept('GET', '**/currencies', {
      'CHF': 'Swiss Franc',
      'EUR': 'Euro',
      'USD': 'US Dollar'
    }).as('getCurrencies');
    
    // Mock successful conversion API response
    cy.intercept('GET', '**/latest?base=CHF&symbols=EUR', {
      fixture: 'currencies.json'
    }).as('getCurrencyRates');

    cy.visit('/calculator');
    cy.wait('@getCurrencies');
    
    cy.get('input[type="number"]').clear().type('100');
    cy.get('button[type="submit"]').click();

    cy.wait('@getCurrencyRates');

    // Check result is displayed
    cy.get('.result-container').should('be.visible');
    cy.get('.original-amount').should('contain', '100 CHF');
    cy.get('.converted-amount').should('be.visible');
    cy.get('.rate-value').should('be.visible');
    cy.get('.date-value').should('be.visible');
  });

  it('should show error for invalid amount', () => {
    cy.get('input[type="number"]').clear().type('0');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('be.visible')
      .and('contain', 'Please enter a valid amount greater than 0');
  });

  it('should show error for negative amount', () => {
    cy.get('input[type="number"]').clear().type('-10');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('be.visible')
      .and('contain', 'Please enter a valid amount greater than 0');
  });

  it('should handle API errors gracefully', () => {
    // Mock currencies API success
    cy.intercept('GET', '**/currencies', {
      'CHF': 'Swiss Franc',
      'EUR': 'Euro'
    }).as('getCurrencies');
    
    // Mock conversion API error
    cy.intercept('GET', '**/latest?base=CHF&symbols=EUR', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getCurrencyRatesError');

    cy.visit('/calculator');
    cy.wait('@getCurrencies');
    
    cy.get('button[type="submit"]').click();
    cy.wait('@getCurrencyRatesError');

    cy.get('.error-message').should('be.visible')
      .and('contain', 'Failed to fetch exchange rates');
  });

  it('should handle same currency conversion', () => {
    // Mock currencies API
    cy.intercept('GET', '**/currencies', {
      'CHF': 'Swiss Franc',
      'EUR': 'Euro'
    }).as('getCurrencies');
    
    cy.visit('/calculator');
    cy.wait('@getCurrencies');
    
    cy.get('select').first().select('CHF');
    cy.get('select').last().select('CHF');
    cy.get('input[type="number"]').clear().type('100');
    
    cy.get('button[type="submit"]').click();

    // Should show result without API call
    cy.get('.result-container').should('be.visible');
    cy.get('.converted-amount').should('contain', '100.00 CHF');
    cy.get('.rate-value').should('contain', '1 CHF = 1.0000 CHF');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-6');
    
    // Check mobile layout
    cy.get('.currency-selection').should('be.visible');
    cy.get('.calculator-card').should('be.visible');
    
    // Form should still be functional
    cy.get('input[type="number"]').should('be.visible');
    cy.get('select').should('have.length', 2);
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should navigate from navbar', () => {
    cy.visit('/');
    
    // Click on Currency Calculator in navbar
    cy.get('nav').contains('Currency Calculator').click();
    
    // Should navigate to calculator page
    cy.url().should('include', '/calculator');
    cy.contains('Currency Calculator').should('be.visible');
  });

  it('should show info section', () => {
    cy.get('.info-section').should('be.visible');
    cy.get('.info-title').should('contain', 'Real-time Exchange Rates');
    cy.get('.info-text').should('contain', 'Exchange rates are updated daily');
  });

  it('should disable convert button for invalid input', () => {
    // Mock currencies API
    cy.intercept('GET', '**/currencies', {
      'CHF': 'Swiss Franc',
      'EUR': 'Euro'
    }).as('getCurrencies');
    
    cy.visit('/calculator');
    cy.wait('@getCurrencies');
    
    cy.get('input[type="number"]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.get('input[type="number"]').type('0');
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.get('input[type="number"]').clear().type('1');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should show loading state while fetching currencies', () => {
    // Intercept currencies API with delay
    cy.intercept('GET', '**/currencies', {
      delay: 1000,
      body: {
        'CHF': 'Swiss Franc',
        'EUR': 'Euro',
        'USD': 'US Dollar'
      }
    }).as('getCurrencies');

    cy.visit('/calculator');

    // Check loading state
    cy.get('select').first().should('be.disabled');
    cy.get('select').last().should('be.disabled');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('select option').first().should('contain', 'Loading currencies...');

    // Wait for currencies to load
    cy.wait('@getCurrencies');

    // Check loading state is gone
    cy.get('select').first().should('not.be.disabled');
    cy.get('select').last().should('not.be.disabled');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should display currency names in dropdowns', () => {
    // Mock currencies API with names
    cy.intercept('GET', '**/currencies', {
      'CHF': 'Swiss Franc',
      'EUR': 'Euro',
      'USD': 'US Dollar'
    }).as('getCurrencies');

    cy.visit('/calculator');
    cy.wait('@getCurrencies');

    // Check that currency options show both code and name
    cy.get('select').first().find('option').should('contain', 'CHF - Swiss Franc');
    cy.get('select').first().find('option').should('contain', 'EUR - Euro');
    cy.get('select').first().find('option').should('contain', 'USD - US Dollar');
  });

  it('should handle currencies API failure gracefully', () => {
    // Mock currencies API failure
    cy.intercept('GET', '**/currencies', {
      statusCode: 500,
      body: { error: 'Server Error' }
    }).as('getCurrenciesError');

    cy.visit('/calculator');
    cy.wait('@getCurrenciesError');

    // Should still have currencies (fallback)
    cy.get('select').first().should('not.be.disabled');
    cy.get('select').last().should('not.be.disabled');
    cy.get('select option').should('have.length.greaterThan', 30);
    
    // Should show error message
    cy.get('.error-message').should('be.visible')
      .and('contain', 'Failed to load available currencies');
  });
});
