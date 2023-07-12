import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { RouterModule } from '@angular/router';
import { ConverterRoutingModule } from './converter-routing.module';
import { CurrencyConverterModule } from 'currency-converter';
@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    CurrencyConverterModule
  ],
  exports: [RouterModule]
})

export class ConverterModule { }
