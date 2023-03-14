import { Injectable } from '@angular/core';
import { deleteDoc, doc, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class ManageService {

  constructor(private fs: Firestore) {}

  public addTransaction(item: any) {
    let current = new Date();
    let time = current.getTime();
    let itemid = doc(collection(this.fs, 'id')).id;
    return setDoc(doc(this.fs, 'transactions', itemid), { id: itemid, type: item.value.typeControl, sum: Number(item.value.amountControl), date: item.value.dateControl, category: item.value.categories, note: item.value.noteControl, time: time });
  }

  public getTransactions(): Observable<any[]> {
    let incomingsRef = collection(this.fs, 'transactions');
    let q = query(incomingsRef, orderBy('time'));
    return collectionData(q) as Observable<any[]>
  }

  public async deleteTransaction(id: any) {
    let docRef = doc(this.fs, `transactions/${id}`);
    await deleteDoc(docRef);
  }

  public updateTransaction(item:any) {
    if (item) {
      let docRef = doc(this.fs, 'transactions', item.id);
      updateDoc(docRef, item);
    }
  }
}
