import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { HttpClient } from '@angular/common/http';

export interface ConversionResult {
  convertedAmount: number;
  rate: number;
  date: string;
}

@Component({
  selector: 'app-currency-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CurrencyService],
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.css'],
})
export class CurrencyCalculatorComponent implements OnInit {
  amount: number = 1;
  fromCurrency: string = 'CHF';
  toCurrency: string = 'EUR';
  result: ConversionResult | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  
  // Available currencies fetched from API
  currencies: string[] = [];
  currencyNames: { [key: string]: string } = {};
  currenciesLoading: boolean = true;

  constructor(public currencyService: CurrencyService) {}

  async ngOnInit(): Promise<void> {
    // Fetch available currencies first
    await this.loadCurrencies();
    
    // Perform initial conversion
    this.convertCurrency();
  }

  async loadCurrencies(): Promise<void> {
    try {
      this.currenciesLoading = true;
      
      // Fetch currencies with names for better UX
      this.currencyNames = await this.currencyService.getSupportedCurrenciesWithNames();
      this.currencies = Object.keys(this.currencyNames).sort();
      
      // Ensure default currencies are available, fallback if not
      if (!this.currencies.includes(this.fromCurrency)) {
        this.fromCurrency = this.currencies.includes('CHF') ? 'CHF' : this.currencies[0];
      }
      if (!this.currencies.includes(this.toCurrency)) {
        this.toCurrency = this.currencies.includes('EUR') ? 'EUR' : this.currencies[1] || this.currencies[0];
      }
    } catch (error) {
      console.error('Failed to load currencies:', error);
      this.error = 'Failed to load available currencies. Using default list.';
      
      // Fallback to basic currency list
      this.currencies = await this.currencyService.getSupportedCurrencies();
    } finally {
      this.currenciesLoading = false;
    }
  }

  async convertCurrency(): Promise<void> {
    if (!this.amount || this.amount <= 0) {
      this.error = 'Please enter a valid amount greater than 0';
      return;
    }

    if (this.fromCurrency === this.toCurrency) {
      this.result = {
        convertedAmount: this.amount,
        rate: 1,
        date: new Date().toISOString().split('T')[0]
      };
      this.error = null;
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      this.result = await this.currencyService.convertCurrency(
        this.fromCurrency,
        this.toCurrency,
        this.amount
      );
    } catch (error) {
      this.error = 'Failed to fetch exchange rates. Please try again later.';
      console.error('Currency conversion error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  swapCurrencies(): void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.convertCurrency();
  }

  onAmountChange(): void {
    if (this.amount && this.amount > 0) {
      this.convertCurrency();
    }
  }

  onCurrencyChange(): void {
    this.convertCurrency();
  }
}
