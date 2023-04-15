import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { FirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsDialogComponent } from './components/transactions/transactions-dialog/transactions-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransactionItemComponent } from './components/transactions/transaction-item/transaction-item.component';
import { GroupByDatePipe } from './pipes/group-by-date.pipe';
import { ShowOnFocusDirective } from './directives/show-on-focus.directive';
import { CurrencyPipe } from './pipes/currency.pipe';
import { MatSelectModule } from '@angular/material/select';
import { HttpTestComponent } from './components/http-test/http-test.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TransactionsComponent,
    TransactionsDialogComponent,
    TransactionItemComponent,
    GroupByDatePipe,
    ShowOnFocusDirective,
    CurrencyPipe,
    HttpTestComponent,
    HomeComponent
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
    MatSelectModule,
    BrowserModule,
    CommonModule,
    FirestoreModule,
    MatDialogModule,
    MatTabsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  exports: [MatInputModule],
  providers: [MatDatepickerModule, { provide: 'ApiURL', useValue: 'some-url', multi: true }, { provide: 'ApiURL', useValue: 'some-url1', multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
