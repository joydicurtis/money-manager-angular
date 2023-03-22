import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from '../services/manage.service';
import { TransactionsDialogComponent } from './transactions-dialog/transactions-dialog.component';
import { Transaction } from './transaction-types';
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
  public transactions?: Transaction[];
  manageDialogRef!: MatDialogRef<TransactionsDialogComponent>;
  title!: string;

  @Input() incomesMode?: boolean = false;
  @Input() expensesMode?: boolean = false;

  constructor(
    private _manageService: ManageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
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

  public deleteItem(item: Transaction) {
    this._manageService.deleteTransaction(item.id);
  }

  public addItem(item: Transaction) {
    this._manageService.addTransaction(item);
  }

  openDialog(
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

  openEditDialog(item: Transaction) {
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
