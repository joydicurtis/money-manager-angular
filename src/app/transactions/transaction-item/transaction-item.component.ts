import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../transaction-types';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'transaction-item'
  }
})
export class TransactionItemComponent implements OnInit {
  @Input() item!: Transaction;
  date!: any;
  ngOnInit () {
    this.date = this.item?.date.toDate();
  }
}
