import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { IncomingsComponent } from './incomings/incomings.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ManageDialogComponent } from './incomings/manage-dialog/manage-dialog.component';
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
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { ManageService } from './services/manage.service';
import { CommonModule } from '@angular/common';
import { IncomingItemComponent } from './incomings/incoming-item/incoming-item.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpenseItemComponent } from './expenses/expense-item/expense-item.component';
import { ManageExpensesDialogComponent } from './expenses/manage-expenses-dialog/manage-expenses-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';

const firebaseConfig = [
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebase) // Your config
];
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    IncomingsComponent,
    ExpensesComponent,
    ManageDialogComponent,
    TabsComponent,
    IncomingItemComponent,
    ExpenseItemComponent,
    ManageExpensesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
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
