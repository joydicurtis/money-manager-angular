import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'money-manager-angular';
  tabsContent = [
    { label: 'All', incomesMode: false, expensesMode: false },
    { label: 'Incomes', incomesMode: true, expensesMode: false },
    { label: 'Expenses', incomesMode: false, expensesMode: true }
  ]
}
