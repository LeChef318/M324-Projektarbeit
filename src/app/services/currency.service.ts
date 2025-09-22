import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export interface ConversionResult {
  convertedAmount: number;
  rate: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly baseUrl = 'https://api.frankfurter.dev/v1';

  constructor(private http: HttpClient) {}

  /**
   * Convert currency using Frankfurter API
   * @param from Source currency code
   * @param to Target currency code
   * @param amount Amount to convert
   * @returns Promise with conversion result
   */
  async convertCurrency(from: string, to: string, amount: number): Promise<ConversionResult> {
    try {
      const url = `${this.baseUrl}/latest?base=${from}&symbols=${to}`;
      const response = await firstValueFrom(
        this.http.get<ExchangeRateResponse>(url).pipe(
          catchError(this.handleError)
        )
      );

      const rate = response.rates[to];
      const convertedAmount = Number((amount * rate).toFixed(2));

      return {
        convertedAmount,
        rate,
        date: response.date
      };
    } catch (error) {
      console.error('Currency conversion failed:', error);
      throw new Error('Failed to convert currency. Please check your internet connection and try again.');
    }
  }

  /**
   * Get latest exchange rates for all supported currencies
   * @param base Base currency (default: EUR)
   * @returns Observable with exchange rates
   */
  getLatestRates(base: string = 'EUR'): Observable<ExchangeRateResponse> {
    const url = `${this.baseUrl}/latest?base=${base}`;
    return this.http.get<ExchangeRateResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get historical exchange rates for a specific date
   * @param date Date in YYYY-MM-DD format
   * @param base Base currency (default: EUR)
   * @param symbols Target currencies (optional)
   * @returns Observable with historical rates
   */
  getHistoricalRates(date: string, base: string = 'EUR', symbols?: string[]): Observable<ExchangeRateResponse> {
    let url = `${this.baseUrl}/${date}?base=${base}`;
    if (symbols && symbols.length > 0) {
      url += `&symbols=${symbols.join(',')}`;
    }
    return this.http.get<ExchangeRateResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get time series data for exchange rates
   * @param startDate Start date in YYYY-MM-DD format
   * @param endDate End date in YYYY-MM-DD format
   * @param base Base currency (default: EUR)
   * @param symbols Target currencies (optional)
   * @returns Observable with time series data
   */
  getTimeSeries(startDate: string, endDate: string, base: string = 'EUR', symbols?: string[]): Observable<any> {
    let url = `${this.baseUrl}/${startDate}..${endDate}?base=${base}`;
    if (symbols && symbols.length > 0) {
      url += `&symbols=${symbols.join(',')}`;
    }
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get list of supported currencies from API
   * @returns Promise with array of currency codes
   */
  async getSupportedCurrencies(): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ [key: string]: string }>(`${this.baseUrl}/currencies`).pipe(
          catchError(this.handleError)
        )
      );
      
      // Extract currency codes and sort alphabetically
      return Object.keys(response).sort();
    } catch (error) {
      console.error('Failed to fetch supported currencies:', error);
      // Fallback to hardcoded list if API fails
      return [
        'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP',
        'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN',
        'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB',
        'TRY', 'USD', 'ZAR'
      ].sort();
    }
  }

  /**
   * Get supported currencies with their full names
   * @returns Promise with object containing currency codes and names
   */
  async getSupportedCurrenciesWithNames(): Promise<{ [key: string]: string }> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ [key: string]: string }>(`${this.baseUrl}/currencies`).pipe(
          catchError(this.handleError)
        )
      );
      
      return response;
    } catch (error) {
      console.error('Failed to fetch supported currencies with names:', error);
      // Fallback to hardcoded list if API fails
      return this.getCurrencyNames();
    }
  }

  /**
   * Get currency name mapping
   * @returns Object with currency codes as keys and names as values
   */
  getCurrencyNames(): { [key: string]: string } {
    return {
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
      'ISK': 'Icelandic Krona',
      'JPY': 'Japanese Yen',
      'KRW': 'South Korean Won',
      'MXN': 'Mexican Peso',
      'MYR': 'Malaysian Ringgit',
      'NOK': 'Norwegian Krone',
      'NZD': 'New Zealand Dollar',
      'PHP': 'Philippine Peso',
      'PLN': 'Polish Zloty',
      'RON': 'Romanian Leu',
      'RUB': 'Russian Ruble',
      'SEK': 'Swedish Krona',
      'SGD': 'Singapore Dollar',
      'THB': 'Thai Baht',
      'TRY': 'Turkish Lira',
      'USD': 'US Dollar',
      'ZAR': 'South African Rand'
    };
  }

  /**
   * Handle HTTP errors
   * @param error HTTP error response
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 400:
          errorMessage = 'Invalid request. Please check your input parameters.';
          break;
        case 404:
          errorMessage = 'Currency data not found.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }

    console.error('CurrencyService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
