import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  CurrencyService,
  ExchangeRateResponse,
} from '../../app/services/currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);

    // Suppress console errors during error testing scenarios
    originalConsoleError = console.error;
    console.error = jasmine.createSpy('console.error');
  });

  afterEach(() => {
    httpMock.verify();
    // Restore original console.error
    console.error = originalConsoleError;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convertCurrency', () => {
    it('should convert currency successfully', async () => {
      const mockResponse: ExchangeRateResponse = {
        amount: 1,
        base: 'EUR',
        date: '2024-01-01',
        rates: { USD: 1.1 },
      };

      const conversionPromise = service.convertCurrency('EUR', 'USD', 100);

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const result = await conversionPromise;

      expect(result).toEqual({
        convertedAmount: 110,
        rate: 1.1,
        date: '2024-01-01',
      });
    });

    it('should handle HTTP errors', async () => {
      const conversionPromise = service.convertCurrency('EUR', 'USD', 100);

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD'
      );
      req.error(new ErrorEvent('Network error'));

      try {
        await conversionPromise;
        fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain(
          'Failed to convert currency'
        );
      }
    });

    it('should round converted amount to 2 decimal places', async () => {
      const mockResponse: ExchangeRateResponse = {
        amount: 1,
        base: 'EUR',
        date: '2024-01-01',
        rates: { USD: 1.123456 },
      };

      const conversionPromise = service.convertCurrency('EUR', 'USD', 1);

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD'
      );
      req.flush(mockResponse);

      const result = await conversionPromise;

      expect(result.convertedAmount).toBe(1.12);
    });
  });

  describe('getLatestRates', () => {
    it('should fetch latest rates with default base EUR', () => {
      const mockResponse: ExchangeRateResponse = {
        amount: 1,
        base: 'EUR',
        date: '2024-01-01',
        rates: { USD: 1.1, GBP: 0.9 },
      };

      service.getLatestRates().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/latest?base=EUR'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch latest rates with custom base', () => {
      const mockResponse: ExchangeRateResponse = {
        amount: 1,
        base: 'USD',
        date: '2024-01-01',
        rates: { EUR: 0.9, GBP: 0.8 },
      };

      service.getLatestRates('USD').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/latest?base=USD'
      );
      req.flush(mockResponse);
    });
  });

  describe('getHistoricalRates', () => {
    it('should fetch historical rates for a specific date', () => {
      const mockResponse: ExchangeRateResponse = {
        amount: 1,
        base: 'EUR',
        date: '2023-12-01',
        rates: { USD: 1.08, GBP: 0.87 },
      };

      service.getHistoricalRates('2023-12-01').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/2023-12-01?base=EUR'
      );
      req.flush(mockResponse);
    });

    it('should fetch historical rates with symbols', () => {
      service
        .getHistoricalRates('2023-12-01', 'EUR', ['USD', 'GBP'])
        .subscribe();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/2023-12-01?base=EUR&symbols=USD,GBP'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('getTimeSeries', () => {
    it('should fetch time series data', () => {
      service.getTimeSeries('2023-12-01', '2023-12-31').subscribe();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/2023-12-01..2023-12-31?base=EUR'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should fetch time series data with symbols', () => {
      service
        .getTimeSeries('2023-12-01', '2023-12-31', 'USD', ['EUR', 'GBP'])
        .subscribe();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/2023-12-01..2023-12-31?base=USD&symbols=EUR,GBP'
      );
      req.flush({});
    });
  });

  describe('getSupportedCurrencies', () => {
    it('should fetch currencies from API successfully', async () => {
      const mockResponse = {
        AUD: 'Australian Dollar',
        CHF: 'Swiss Franc',
        EUR: 'Euro',
        USD: 'US Dollar',
      };

      const currenciesPromise = service.getSupportedCurrencies();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/currencies'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const result = await currenciesPromise;

      expect(result).toEqual(['AUD', 'CHF', 'EUR', 'USD']);
    });

    it('should handle API errors and return fallback currencies', async () => {
      const currenciesPromise = service.getSupportedCurrencies();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/currencies'
      );
      req.error(new ErrorEvent('Network error'));

      const result = await currenciesPromise;

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(30);
      expect(result).toContain('EUR');
      expect(result).toContain('USD');
      expect(result).toContain('CHF');
    });
  });

  describe('getSupportedCurrenciesWithNames', () => {
    it('should fetch currencies with names from API successfully', async () => {
      const mockResponse = {
        AUD: 'Australian Dollar',
        CHF: 'Swiss Franc',
        EUR: 'Euro',
        USD: 'US Dollar',
      };

      const currenciesPromise = service.getSupportedCurrenciesWithNames();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/currencies'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const result = await currenciesPromise;

      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors and return fallback currency names', async () => {
      const currenciesPromise = service.getSupportedCurrenciesWithNames();

      const req = httpMock.expectOne(
        'https://api.frankfurter.dev/v1/currencies'
      );
      req.error(new ErrorEvent('Network error'));

      const result = await currenciesPromise;

      expect(typeof result).toBe('object');
      expect(result['EUR']).toBe('Euro');
      expect(result['USD']).toBe('US Dollar');
      expect(result['CHF']).toBe('Swiss Franc');
    });
  });

  describe('getCurrencyNames', () => {
    it('should return object with currency names', () => {
      const names = service.getCurrencyNames();

      expect(typeof names).toBe('object');
      expect(names['EUR']).toBe('Euro');
      expect(names['USD']).toBe('US Dollar');
      expect(names['GBP']).toBe('British Pound');
    });
  });
});
