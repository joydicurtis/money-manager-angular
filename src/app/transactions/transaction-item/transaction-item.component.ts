import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'transaction-item'
  }
})
export class TransactionItemComponent {
  @Input() item: any;
  date: any;
  ngOnInit () {
    this.date = this.item.date.toDate();
  }
}
