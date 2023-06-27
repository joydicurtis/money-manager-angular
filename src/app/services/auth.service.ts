import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/transaction-types';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = '/users';

  usersRef: AngularFirestoreCollection<User>;

  constructor(protected db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  private isSignedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean>{
    return this.isSignedIn.asObservable();
  }

  logIn() {
    return this.isSignedIn.next(true);
  }

  logOut() {
    return this.isSignedIn.next(false);
  }

  canActivate() {
    return this.isSignedIn;
  }

  //TODO: fix user validation
  // public getUserByEmail(email: string) {
  //   return this.usersRef.doc(email);
  // }

  public addUsers(item: any) {
    return this.usersRef.add({
      email: item.value.emailControl,
      password: item.value.passwordControl
    });
  }
}
