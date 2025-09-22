/**
 * Global Test Setup
 * This file runs before all tests and sets up global mocks to prevent HTTP requests
 */

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Global HTTP request blocker for all tests
const originalFetch = window.fetch;
const originalXHR = (window as any).XMLHttpRequest;

// Mock fetch API
window.fetch = jest.fn(() => 
  Promise.reject(new Error('HTTP requests are not allowed in tests. Use mocks instead.'))
);

// Mock XMLHttpRequest
(window as any).XMLHttpRequest = class MockXHR {
  open() { 
    console.warn('XMLHttpRequest blocked in test environment');
  }
  send() { 
    console.warn('XMLHttpRequest blocked in test environment');
  }
  setRequestHeader() { /* no-op */ }
  addEventListener() { /* no-op */ }
  readyState = 4;
  status = 200;
  responseText = '{}';
};

// Restore originals after all tests (cleanup)
afterAll(() => {
  window.fetch = originalFetch;
  (window as any).XMLHttpRequest = originalXHR;
});
