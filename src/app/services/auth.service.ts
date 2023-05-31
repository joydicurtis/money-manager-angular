import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  doc,
  query,
  setDoc,
} from 'firebase/firestore';
import { Firestore, collectionData, collection, where } from '@angular/fire/firestore';
import { User } from '../shared/transaction-types';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fs: Firestore) {}

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

  public getUsers(): Observable<User[]> {
    const usersRef = collection(this.fs, 'users');
    const q = query(usersRef);
    return collectionData(q) as Observable<User[]>;
  }

  public getUserByEmail(email: string): Observable<User[]> {
    const usersRef = collection(this.fs, 'users');
    const q = query(usersRef, where("email", "==", email));
    return collectionData(q) as Observable<User[]>;
  }

  public addUsers(item: FormGroup) {
    const itemid = doc(collection(this.fs, 'id')).id;
    return setDoc(doc(this.fs, 'users', itemid), {
      id: itemid,
      email: item.value.emailControl,
      password: item.value.passwordControl
    });
  }

}
