import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CurrencyRates {
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export interface CurrencyList {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly baseUrl = 'https://api.frankfurter.dev/v1';

  constructor(private http: HttpClient) {}

  /**
   * Get all available currencies
   */
  getCurrencies(): Observable<CurrencyList> {
    return this.http.get<CurrencyList>(`${this.baseUrl}/currencies`);
  }

  /**
   * Get latest exchange rates for a base currency
   */
  getLatestRates(baseCurrency: string = 'EUR'): Observable<CurrencyRates> {
    return this.http.get<CurrencyRates>(`${this.baseUrl}/latest?base=${baseCurrency}`);
  }

  /**
   * Get exchange rates for specific currencies
   */
  getSpecificRates(baseCurrency: string, targetCurrencies: string[]): Observable<CurrencyRates> {
    const symbols = targetCurrencies.join(',');
    return this.http.get<CurrencyRates>(`${this.baseUrl}/latest?base=${baseCurrency}&symbols=${symbols}`);
  }

  /**
   * Get historic exchange rates for a specific date and currency
   */
  getHistoricRates(date: string, baseCurrency: string = 'EUR'): Observable<CurrencyRates> {
    return this.http.get<CurrencyRates>(`${this.baseUrl}/${date}?base=${baseCurrency}`);
  }

  /**
   * Get historic exchange rates for a date range and specific currency pair
   */
  getHistoricRatesRange(startDate: string, endDate: string, baseCurrency: string = 'EUR', targetCurrency?: string): Observable<any> {
    let url = `${this.baseUrl}/${startDate}..${endDate}?base=${baseCurrency}`;
    if (targetCurrency) {
      url += `&symbols=${targetCurrency}`;
    }
    return this.http.get<any>(url);
  }
}
