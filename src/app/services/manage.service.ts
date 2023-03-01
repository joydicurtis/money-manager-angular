import { Injectable } from '@angular/core';
import { deleteDoc, doc, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class ManageService {

  constructor(private fs: Firestore) {}

  public addIncoming(item: any) {
    let current = new Date();
    let time = current.getTime();
    let itemid = doc(collection(this.fs, 'id')).id;
    return setDoc(doc(this.fs, 'incomings', itemid), { id: itemid, sum: Number(item.value.sumControl), date: item.value.dateControl, category: item.value.categories, note: item.value.noteControl, time: time });
  }

  public getIncomings(): Observable<any[]> {
    let incomingsRef = collection(this.fs, 'incomings');
    let q = query(incomingsRef, orderBy('time'));
    return collectionData(q) as Observable<any[]>
  }

  public async deleteIncoming(id: any) {
    let docRef = doc(this.fs, `incomings/${id}`);
    await deleteDoc(docRef);
  }

  public updateIncoming(item:any) {
    if (item) {
      let docRef = doc(this.fs, 'incomings', item.id);
      updateDoc(docRef, item);
    }
  }

  public addExpense(item: any) {
    let current = new Date();
    let time = current.getTime();
    let itemid = doc(collection(this.fs, 'id')).id;
    return setDoc(doc(this.fs, 'expenses', itemid), { id: itemid, sum: Number(item.value.sumControl), date: item.value.dateControl, category: item.value.categories, note: item.value.noteControl, time: time });
  }

  public getExpenses(): Observable<any[]> {
    let incomingsRef = collection(this.fs, 'expenses');
    let q = query(incomingsRef, orderBy('time'));
    return collectionData(q) as Observable<any[]>
  }

  public async deleteExpense(id: any) {
    let docRef = doc(this.fs, `expenses/${id}`);
    await deleteDoc(docRef);
  }

  public updateExpense(item:any) {
    if (item) {
      let docRef = doc(this.fs, 'expenses', item.id);
      updateDoc(docRef, item);
    }
  }
}
