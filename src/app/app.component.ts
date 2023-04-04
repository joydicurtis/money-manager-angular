import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
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
    const currencyRateData = await this.currencyService.getCurrencyRate();
    if (currencyRateData) {
      this.usdUahRate = currencyRateData.conversion_rates['UAH'];
      this.usdEurRate = currencyRateData.conversion_rates['EUR'];
      this.usdGbpRate = currencyRateData.conversion_rates['GBP'];
      this.currentDateRate = currencyRateData.time_last_update_unix;
    }
  }
}
