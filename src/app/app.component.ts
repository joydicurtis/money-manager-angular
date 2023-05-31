import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  isSignedIn = false;
  AuthDialogRef!: MatDialogRef<AuthDialogComponent>;

  constructor(protected authService: AuthService, public dialog: MatDialog) {
    this.authService.isLoggedIn.subscribe((item: any) => {this.isSignedIn = item});
  }

  signIn() {
    return this.authService.logIn();
  }
  signOut() {
    return this.authService.logOut();
  }

  protected openAuthDialog() {
    this.AuthDialogRef = this.dialog.open(AuthDialogComponent);
    this.AuthDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.authService.addUsers(data);
      }
    });
  }
}
