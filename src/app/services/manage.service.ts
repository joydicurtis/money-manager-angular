import { Injectable } from '@angular/core';
import {
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Transaction } from '../transactions/transaction-types';
@Injectable({
  providedIn: 'root',
})
export class ManageService {
  constructor(private fs: Firestore) {}

  public addTransaction(item: FormGroup) {
    const current = new Date();
    const time = current.getTime();
    const itemid = doc(collection(this.fs, 'id')).id;
    return setDoc(doc(this.fs, 'transactions', itemid), {
      id: itemid,
      type: item.value.typeControl,
      sum: Number(item.value.amountControl),
      date: item.value.dateControl,
      category: item.value.categories,
      note: item.value.noteControl,
      time: time,
    });
  }

  public getTransactions(): Observable<Transaction[]> {
    const incomesRef = collection(this.fs, 'transactions');
    const q = query(incomesRef, orderBy('time'));
    return collectionData(q) as Observable<Transaction[]>;
  }

  public async deleteTransaction(id: string) {
    const docRef = doc(this.fs, `transactions/${id}`);
    await deleteDoc(docRef);
  }

  public updateTransaction(item: Transaction) {
    if (item) {
      const docRef = doc(this.fs, 'transactions', item.id);
      updateDoc(docRef, item);
    }
  }
}
