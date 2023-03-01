import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent {
  @Input() item: any;
  date: any;
  ngOnInit () {
    this.date = this.item.date.toDate();
  }
}
