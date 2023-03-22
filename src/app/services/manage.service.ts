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
@Injectable({
  providedIn: 'root',
})
export class ManageService {
  constructor(private fs: Firestore) {}

  public addTransaction(item: any) {
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

  public getTransactions(): Observable<any[]> {
    const incomesRef = collection(this.fs, 'transactions');
    const q = query(incomesRef, orderBy('time'));
    return collectionData(q) as Observable<any[]>;
  }

  public async deleteTransaction(id: any) {
    const docRef = doc(this.fs, `transactions/${id}`);
    await deleteDoc(docRef);
  }

  public updateTransaction(item: any) {
    if (item) {
      const docRef = doc(this.fs, 'transactions', item.id);
      updateDoc(docRef, item);
    }
  }
}
