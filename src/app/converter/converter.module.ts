import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { RouterModule } from '@angular/router';
import { ConverterRoutingModule } from './converter-routing.module'
import { CurrencyConverterLibModule } from 'currency-converter-lib'
@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    CurrencyConverterLibModule
  ],
  exports: [RouterModule]
})

export class ConverterModule { }
