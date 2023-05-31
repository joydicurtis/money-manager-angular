import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Transaction } from '../../../shared/transaction-types';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  animations: [
    trigger('deleteItem', [
      state('initial', style({ height: '*' })),
      state('deleted', style({ transform: 'translateX(-100%)' })),
      transition('initial <=> deleted', animate('0.3s')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'transaction',
  },
})

export class TransactionItemComponent implements OnInit {
  @Input() item!: Transaction;
  @Output() onDeleteEvent = new EventEmitter<Transaction>();
  @Output() onEditEvent = new EventEmitter<Transaction>();
  @HostBinding('class.transaction--income') isIncome = false;
  @HostBinding('class.transaction--expense') isExpense = false;
  isDeleted = false;
  state = 'initial';

  ngOnInit() {
    (this.item.type.value === 'income') ? this.isIncome = true : this.isExpense = true;
  }

  deleteItem(value: Transaction) {
    this.isDeleted = !this.isDeleted;
    this.state = this.isDeleted ? 'deleted' : 'initial';
    setTimeout(() => {
      this.onDeleteEvent.emit(value);
    }, 300);


  }

  editItem(value: Transaction) {
    this.onEditEvent.emit(value);
  }
}
