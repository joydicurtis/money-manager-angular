import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HttpTestComponent } from './components/http-test/http-test.component';
import { RouterModule } from '@angular/router'

const routes = [
  { path: '', component: HomeComponent },
  { path: 'converter', loadChildren: () => import('./converter/converter.module').then(mod => mod.ConverterModule) },
  { path: 'http-test', component: HttpTestComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
