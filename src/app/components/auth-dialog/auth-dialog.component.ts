import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, delay, map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { matchValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
  host: {
    class: 'http-test-dialog transaction-dialog',
  },
})
export class AuthDialogComponent implements OnInit {
  authForm!: FormGroup;
  isSubmitted = false;
  constructor(private dialogRef: MatDialogRef<AuthDialogComponent>, protected authService: AuthService) {
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      // this.userExistsValidator.bind(this)
      ),
      passwordControl: new FormControl('', [Validators.required]),
      repeatPasswordControl: new FormControl('', [Validators.required])
    }, {validators: matchValidator })
  }

  // userExistsValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
  //   return this.authService.getUserByEmail(control.value).pipe(delay(1000),
  //     map(x => {
  //       if (x.length > 0) {
  //         return { userExistsValidator: { message: 'User with such email already exists!' } }
  //       }
  //       return null;
  //     }), take(1)
  //   );
  // };

  close() {
    this.dialogRef.close();
  }
  submit() {
    this.isSubmitted = true;
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.authForm);
    }
  }
}
