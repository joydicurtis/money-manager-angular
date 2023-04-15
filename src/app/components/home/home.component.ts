import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tabsContent = [
    { label: 'All', incomesMode: false, expensesMode: false },
    { label: 'Incomes', incomesMode: true, expensesMode: false },
    { label: 'Expenses', incomesMode: false, expensesMode: true }
  ];
}
