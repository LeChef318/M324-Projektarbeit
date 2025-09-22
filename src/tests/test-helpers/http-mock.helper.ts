/**
 * HTTP Mock Helper for Test Suite
 * 
 * This helper provides complete HTTP mocking to eliminate all real HTTP requests
 * in tests, preventing console errors and ensuring fast, reliable test execution.
 */

import { Injectable } from '@angular/core';

/**
 * Mock Currency Service that completely replaces HTTP calls
 */
@Injectable()
export class MockCurrencyService {
  private defaultCurrencies = {
    'AUD': 'Australian Dollar',
    'BGN': 'Bulgarian Lev', 
    'BRL': 'Brazilian Real',
    'CAD': 'Canadian Dollar',
    'CHF': 'Swiss Franc',
    'CNY': 'Chinese Yuan',
    'CZK': 'Czech Koruna',
    'DKK': 'Danish Krone',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'HKD': 'Hong Kong Dollar',
    'HRK': 'Croatian Kuna',
    'HUF': 'Hungarian Forint',
    'IDR': 'Indonesian Rupiah',
    'ILS': 'Israeli Shekel',
    'INR': 'Indian Rupee',
    'ISK': 'Icelandic Króna',
    'JPY': 'Japanese Yen',
    'KRW': 'South Korean Won',
    'MXN': 'Mexican Peso',
    'MYR': 'Malaysian Ringgit',
    'NOK': 'Norwegian Krone',
    'NZD': 'New Zealand Dollar',
    'PHP': 'Philippine Peso',
    'PLN': 'Polish Złoty',
    'RON': 'Romanian Leu',
    'RUB': 'Russian Ruble',
    'SEK': 'Swedish Krona',
    'SGD': 'Singapore Dollar',
    'THB': 'Thai Baht',
    'TRY': 'Turkish Lira',
    'USD': 'US Dollar',
    'ZAR': 'South African Rand'
  };

  private defaultRates: { [key: string]: number } = {
    'AUD': 1.52,
    'BGN': 1.96,
    'BRL': 5.42,
    'CAD': 1.36,
    'CHF': 0.92,
    'CNY': 7.23,
    'CZK': 23.45,
    'DKK': 7.46,
    'EUR': 1.0,
    'GBP': 0.86,
    'HKD': 7.85,
    'HRK': 7.53,
    'HUF': 392.15,
    'IDR': 15234.56,
    'ILS': 3.72,
    'INR': 83.12,
    'ISK': 138.45,
    'JPY': 149.23,
    'KRW': 1342.56,
    'MXN': 17.89,
    'MYR': 4.72,
    'NOK': 10.87,
    'NZD': 1.64,
    'PHP': 56.78,
    'PLN': 4.34,
    'RON': 4.97,
    'RUB': 92.45,
    'SEK': 11.23,
    'SGD': 1.35,
    'THB': 36.89,
    'TRY': 27.45,
    'USD': 1.08,
    'ZAR': 19.87
  };

  async getSupportedCurrencies(): Promise<string[]> {
    // Simulate async operation without HTTP
    return Promise.resolve(Object.keys(this.defaultCurrencies).sort());
  }

  async getSupportedCurrenciesWithNames(): Promise<{ [key: string]: string }> {
    // Simulate async operation without HTTP
    return Promise.resolve(this.defaultCurrencies);
  }

  async convertCurrency(from: string, to: string, amount: number): Promise<{
    convertedAmount: number;
    rate: number;
    date: string;
  }> {
    // Simulate async operation without HTTP
    const fromRate = this.defaultRates[from] || 1;
    const toRate = this.defaultRates[to] || 1;
    const rate = toRate / fromRate;
    const convertedAmount = parseFloat((amount * rate).toFixed(2));

    return Promise.resolve({
      convertedAmount,
      rate: parseFloat(rate.toFixed(4)),
      date: new Date().toISOString().split('T')[0]
    });
  }
}

/**
 * Test Configuration Helper
 * Provides common test setup with complete HTTP mocking
 */
export class TestConfigHelper {
  static getComponentTestConfig() {
    return {
      providers: [
        { provide: 'CurrencyService', useClass: MockCurrencyService }
      ]
    };
  }

  static getMockCurrencyService(): MockCurrencyService {
    return new MockCurrencyService();
  }
}

/**
 * HTTP Request Interceptor for Tests
 * Prevents any real HTTP requests from escaping the test environment
 */
export function preventRealHttpRequests() {
  // Override XMLHttpRequest to prevent real requests
  const originalXHR = (window as any).XMLHttpRequest;
  
  (window as any).XMLHttpRequest = class MockXHR {
    open() { /* no-op */ }
    send() { 
      console.warn('Real HTTP request attempted in test environment - blocked');
    }
    setRequestHeader() { /* no-op */ }
    addEventListener() { /* no-op */ }
  };

  return () => {
    // Restore original XMLHttpRequest
    (window as any).XMLHttpRequest = originalXHR;
  };
}
