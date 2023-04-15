import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { ConverterComponent } from './converter/converter.component';

const routes: Routes = [
  { path: '', component: ConverterComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})

export class ConverterRoutingModule { }
