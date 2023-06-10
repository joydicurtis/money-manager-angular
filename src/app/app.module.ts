import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
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
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
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
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { CurrencyDataComponent } from './components/currency-data/currency-data.component';
import { BlogItemUpdateDialogComponent } from './components/blog/blog-item-update-dialog/blog-item-update-dialog.component';
import { BlogItemDetailsComponent } from './components/blog/blog-item-details/blog-item-details.component';
import { BlogItemEditComponent } from './components/blog/blog-item-edit/blog-item-edit.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoggedDirective } from './directives/logged.directive';
import { BlogItemTooltipComponent } from './components/blog/blog-item-tooltip/blog-item-tooltip.component';
import { BlogItemComponent } from './components/blog/blog-item/blog-item.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';

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
    BlogComponent,
    HomeComponent,
    CurrencyDataComponent,
    BlogItemUpdateDialogComponent,
    BlogItemDetailsComponent,
    BlogItemEditComponent,
    AuthDialogComponent,
    LoggedDirective,
    BlogItemTooltipComponent,
    BlogItemComponent,
    SortByDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
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
    MatDialogModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    HttpClientModule,
  ],
  exports: [MatInputModule],
  providers: [AngularFirestoreModule, MatDatepickerModule, { provide: 'ApiURL', useValue: 'some-url', multi: true }, { provide: 'ApiURL', useValue: 'some-url1', multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
