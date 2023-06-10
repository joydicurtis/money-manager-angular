import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogItemDetailsComponent } from './components/blog/blog-item-details/blog-item-details.component';
import { BlogItemEditComponent } from './components/blog/blog-item-edit/blog-item-edit.component';
import { RouterModule } from '@angular/router'
import { AuthGuard } from './services/auth.guard';

type PathMatch = "full" | "prefix" | undefined;

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' as PathMatch },
  { path: 'converter', loadChildren: () => import('./converter/converter.module').then(mod => mod.ConverterModule) },
  { path: 'http-test', component: BlogComponent },
  { path: 'http-test/:id', component: BlogItemDetailsComponent },
  { path: 'http-test/edit/:id', component: BlogItemEditComponent, canActivate: [AuthGuard] }
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
