import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { filter, map } from 'rxjs';
import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { ManageService } from '../services/manage.service';

@Component({
  selector: 'app-incomings',
  templateUrl: './incomings.component.html',
  styleUrls: ['./incomings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'incomings'
  }
})

export class IncomingsComponent {
  public incomings: any;
  manageDialogRef!: MatDialogRef<ManageDialogComponent>;
  addMode: boolean = false;
  incomingsMode: boolean = true;

  constructor(private _manageService: ManageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this._manageService.getIncomings().subscribe(data => {
      this.incomings = data;
    });
  }

  public deleteItem(item: any) {
    this._manageService.deleteIncoming(item.id);
  }

  public addItem(item: any) {
    this._manageService.addIncoming(item);
  }

  openDialog(item?: any) {
    this.manageDialogRef = this.dialog.open(ManageDialogComponent, {
      data: item
    });
    this.manageDialogRef.afterClosed().subscribe(
      data => {
        this._manageService.addIncoming(data);
      }
    );
  }

  openEditDialog(item: any) {
    this.manageDialogRef = this.dialog.open(ManageDialogComponent, {
      data: item
    });
    this.manageDialogRef.afterClosed().subscribe(
      data => {
        this._manageService.updateIncoming(data);
      }
    );
  }
}
