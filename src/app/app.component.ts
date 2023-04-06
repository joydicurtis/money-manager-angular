import { Component, OnInit } from '@angular/core';
import { CurrencyData } from './components/transactions/transaction-types';
import { CurrencyService } from './services/currency.service';
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

  usdUahRate!: number;
  usdEurRate!: number;
  usdGbpRate!: number;
  currentDateRate!: any;

  constructor(protected currencyService: CurrencyService) {
  }

  async ngOnInit() {
    this.currencyService.getCurrencyRate().subscribe(
      (response: CurrencyData) => {
        this.usdUahRate = response.conversion_rates['UAH'];
        this.usdEurRate = response.conversion_rates['EUR'];
        this.usdGbpRate = response.conversion_rates['GBP'];
        this.currentDateRate = response.time_last_update_unix;
        console.log(typeof(this.currentDateRate));
      },
      (error: Error) => {
        console.log('error', error);
      }
    )
  }
}
