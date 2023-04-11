import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from '../../services/manage.service';
import { TransactionsDialogComponent } from './transactions-dialog/transactions-dialog.component';
import { Transaction } from './transaction-types';
import { Logger } from 'src/app/decorators/logger.decorator';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'transactions',
  },
})

export class TransactionsComponent implements OnInit {
  public transactions?: any;
  manageDialogRef!: MatDialogRef<TransactionsDialogComponent>;
  title!: string;
  @ViewChild('searchControl', { static: true }) searchControl!: ElementRef;
  @Input() incomesMode?: boolean = false;
  @Input() expensesMode?: boolean = false;

  constructor(
    private _manageService: ManageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getItems();
    const s = fromEvent(this.searchControl.nativeElement, 'input');
    s.subscribe((input: any) => {
      if (input.target.value === '') {
        this.getItems();
      }
      this.transactions = this.transactions.filter((item: Transaction) => item.category.name.toLowerCase().includes((input.target.value.toLowerCase())));
    });
  }

  protected getItems() {
    this._manageService.getTransactions().subscribe((data) => {
      if (this.incomesMode) {
        this.title = 'Incomes';
        this.transactions = data.filter(
          (item) => item.type.value === 'income'
        );
      } else if (this.expensesMode) {
        this.title = 'Expenses';
        this.transactions = data.filter(
          (item) => item.type.value === 'expense'
        );
      } else {
        this.title = 'All';
        this.transactions = data;
      }
    });
  }

  @Logger
  protected deleteItem(item: Transaction) {
    this._manageService.deleteTransaction(item.id);
  }

  @Logger
  protected openDialog(
    item?: Transaction,
    incomesMode?: boolean,
    expensesMode?: boolean
  ) {
    this.manageDialogRef = this.dialog.open(TransactionsDialogComponent, {
      data: {
        item,
        incomesMode,
        expensesMode,
      },
    });
    this.manageDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this._manageService.addTransaction(data);
      }
    });
  }

  @Logger
  protected openEditDialog(item: Transaction) {
    this.manageDialogRef = this.dialog.open(TransactionsDialogComponent, {
      data: {
        item,
      },
    });
    this.manageDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this._manageService.updateTransaction(data);
      }
    });
  }
}
