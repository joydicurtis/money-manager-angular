import { Component } from '@angular/core';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'money-manager-angular';
  isVisible: boolean = false;
  constructor(public dialogService: DialogService) {}
  public openDialog() {
    console.log('dialog open');
  }
}
