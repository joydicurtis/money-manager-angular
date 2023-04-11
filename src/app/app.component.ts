import { Component, OnInit } from '@angular/core';
import { CurrencyData, CurrencyRate } from './components/transactions/transaction-types';
import { CurrencyService } from './services/currency.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'money-manager-angular';
  tabsContent = [
    { label: 'All', incomesMode: false, expensesMode: false },
    { label: 'Incomes', incomesMode: true, expensesMode: false },
    { label: 'Expenses', incomesMode: false, expensesMode: true }
  ];

  currencies = [
    { name: 'EUR', symbol: '€' },
    { name: 'UAH', symbol: '₴' },
    { name: 'USD', symbol: '$' },
    { name: 'GBP', symbol: '£' }
  ]

  selectedCurrency: CurrencyRate = this.currencies[1];
  currencyRes: CurrencyRate[] = [];

  usdUahRate!: number;
  usdEurRate!: number;
  usdGbpRate!: number;
  currentDateRate!: any;

  constructor(protected currencyService: CurrencyService) {}

  async ngOnInit() {
    this.currencyChange(this.selectedCurrency);
  }

  currencyChange(selectedCurrency: CurrencyRate) {
    this.currencyRes = [];
    this.currencyService.getCurrencyRate(selectedCurrency.name).subscribe({
      next: (response: CurrencyData) => {
        this.currencies.forEach(value => {
          if (value.name !== this.selectedCurrency.name) {
            this.currencyRes.push({name: value.name, amount: response.conversion_rates[value.name], symbol: value.symbol});
          }
        });
        this.currentDateRate = response.time_last_update_unix;
      },
      error: (error: Error) => {
        return throwError(() => error);
      }
    })
  }
}
