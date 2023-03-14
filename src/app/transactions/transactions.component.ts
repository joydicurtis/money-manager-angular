import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from '../services/manage.service';
import { TransactionsDialogComponent } from './transactions-dialog/transactions-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'transactions'
  }
})
export class TransactionsComponent {
  public transactions: any;
  manageDialogRef!: MatDialogRef<TransactionsDialogComponent>;
  addMode: boolean = false;
  title: string = '';

  @Input() incomingsMode?: boolean = false;
  @Input() expensesMode?: boolean = false;

  constructor(private _manageService: ManageService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this._manageService.getTransactions().subscribe(data => {
      if (this.incomingsMode) {
        this.title = 'Incomings';
        this.transactions = data.filter(item => item.type.value === 'incoming');
      }
      else if (this.expensesMode) {
        this.title = 'Expenses';
        this.transactions = data.filter(item => item.type.value === 'expense');
      }
      else {
        this.title = 'All';
        this.transactions = data;
      }
    });
  }

  public deleteItem(item: any) {
    this._manageService.deleteTransaction(item.id);
  }

  public addItem(item: any) {
    this._manageService.addTransaction(item);
  }

  openDialog(item?: any, incomingsMode?: boolean, expensesMode?: boolean) {
    this.manageDialogRef = this.dialog.open(TransactionsDialogComponent, {
      data: {
        item,
        incomingsMode,
        expensesMode
      }
    });
    this.manageDialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._manageService.addTransaction(data);
        }
      }
    );
  }

  openEditDialog(item: any) {
    this.manageDialogRef = this.dialog.open(TransactionsDialogComponent, {
      data: {
        item
      }
    });
    this.manageDialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._manageService.updateTransaction(data);
        }
      }
    );
  }
}
