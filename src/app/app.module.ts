import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TabsComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { FirestoreModule } from '@angular/fire/firestore';
import { ManageService } from './services/manage.service';
import { CommonModule } from '@angular/common';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsDialogComponent } from './transactions/transactions-dialog/transactions-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TransactionItemComponent } from './transactions/transaction-item/transaction-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TabsComponent,
    TransactionsComponent,
    TransactionsDialogComponent,
    TransactionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    MatButtonToggleModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FirestoreModule,
    MatDialogModule,
    MatTabsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  exports: [
    MatInputModule
  ],
  providers: [ManageService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
