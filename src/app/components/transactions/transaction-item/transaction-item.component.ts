import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Logger } from 'src/app/decorators/logger.decorator';
import { Transaction } from '../transaction-types';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'transaction-item',
  },
})

export class TransactionItemComponent implements OnInit {
  @Input() item!: Transaction;
  @Output() onDeleteEvent = new EventEmitter<Transaction>();
  @Output() onEditEvent = new EventEmitter<Transaction>();
  @HostBinding('class.transaction-item--income') isIncome: boolean = false;
  @HostBinding('class.transaction-item--expense') isExpense: boolean = false;

  ngOnInit() {
    (this.item.type.value === 'income') ? this.isIncome = true : this.isExpense = true;
  }

  deleteItem(value: Transaction) {
    this.onDeleteEvent.emit(value);
  }

  editItem(value: Transaction) {
    this.onEditEvent.emit(value);
  }
}
