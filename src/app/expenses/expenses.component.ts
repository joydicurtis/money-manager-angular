import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageExpensesDialogComponent } from './manage-expenses-dialog/manage-expenses-dialog.component';
import { ManageService } from '../services/manage.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'expenses'
  }
})
export class ExpensesComponent implements OnInit {
  public expenses: any;
  manageDialogRef!: MatDialogRef<ManageExpensesDialogComponent>;

  constructor(public _manageService: ManageService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getItems();
  }
  public getItems() {
    this._manageService.getExpenses().subscribe(data => {
      this.expenses = data;
    });
  }

  public deleteItem(item: any) {
    this._manageService.deleteExpense(item.id);
  }

  public addItem(item: any) {
    this._manageService.addExpense(item);
  }

  openDialog(item?: any) {
    this.manageDialogRef = this.dialog.open(ManageExpensesDialogComponent, {
      data: item
    });
    this.manageDialogRef.afterClosed().subscribe(
      data => {
        this._manageService.addExpense(data);
      }
    );
  }

  openEditDialog(item: any) {
    this.manageDialogRef = this.dialog.open(ManageExpensesDialogComponent, {
      data: item
    });
    this.manageDialogRef.afterClosed().subscribe(
      data => {
        this._manageService.updateExpense(data);
      }
    );
  }
}
