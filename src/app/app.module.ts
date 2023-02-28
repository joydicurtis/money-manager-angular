import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { IncomingsComponent } from './incomings/incomings.component';
import { ExpencesComponent } from './expences/expences.component';
import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    IncomingsComponent,
    ExpencesComponent,
    ManageDialogComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
