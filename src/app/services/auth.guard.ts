import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  isSigned = false;
  constructor(protected auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    this.auth.isLoggedIn.subscribe((data: boolean) => this.isSigned = data);
    if (this.isSigned) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
