import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './converter/converter.component';
import { RouterModule } from '@angular/router';
import { ConverterRoutingModule } from './converter-routing.module'

@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule
  ],
  exports: [RouterModule]
})

export class ConverterModule { }
