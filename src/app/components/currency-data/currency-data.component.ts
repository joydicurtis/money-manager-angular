import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrencyData, CurrencyRate } from '../../shared/transaction-types';
import { CurrencyService } from 'src/app/services/currency.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-currency-data',
  templateUrl: './currency-data.component.html',
  styleUrls: ['./currency-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'currency-data',
  },
})
export class CurrencyDataComponent implements OnInit {
  currencies = [
    { name: 'EUR', symbol: '€' },
    { name: 'UAH', symbol: '₴' },
    { name: 'USD', symbol: '$' },
    { name: 'GBP', symbol: '£' }
  ]
  selectedCurrency: CurrencyRate = this.currencies[1];
  currencyRes: CurrencyRate[] = [];
  currentDateRate!: any;

  constructor(protected currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyChange(this.selectedCurrency);
  }

  currencyChange(selectedCurrency: CurrencyRate) {
    this.currencyRes = [];
    const cur = selectedCurrency.name;
    const apiKey = 'f66cbdbee9d8de446cfe3067';
    const requestURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${cur}`;
    this.currencyService.getCurrencyRate(requestURL).subscribe({
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
