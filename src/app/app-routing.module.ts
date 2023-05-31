import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HttpTestComponent } from './components/http-test/http-test.component';
import { HttpTestDetailsComponent } from './components/http-test/http-test-details/http-test-details.component';
import { HttpTestDetailsEditComponent } from './components/http-test/http-test-details-edit/http-test-details-edit.component';
import { RouterModule } from '@angular/router'
import { AuthGuard } from './services/auth.guard';

type PathMatch = "full" | "prefix" | undefined;

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' as PathMatch },
  { path: 'converter', loadChildren: () => import('./converter/converter.module').then(mod => mod.ConverterModule) },
  { path: 'http-test', component: HttpTestComponent },
  { path: 'http-test/:id', component: HttpTestDetailsComponent },
  { path: 'http-test/edit/:id', component: HttpTestDetailsEditComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
