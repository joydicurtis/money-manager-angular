import { Injectable } from '@angular/core';
import { Transaction } from '../shared/transaction-types';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ManageService {
  private dbPath = 'transactions';

  expensesRef: AngularFirestoreCollection<Transaction>;
  business$: Observable<any[]>;

  constructor(protected db: AngularFirestore) {
    this.expensesRef = db.collection(this.dbPath);
  }

  getAllData(){
    this.business$ = this.expensesRef.valueChanges();
    return this.business$;
 }

  public getTransactions(): AngularFirestoreCollection<Transaction> {
    return this.expensesRef;
  }

  public getData(): Observable<any> {
    return this.getTransactions().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
      )
    );
  }


  public addTransaction(item: any) {
    return this.expensesRef.add({
      type: item?.value?.typeControl,
      sum: Number(item?.value?.amountControl),
      date: item.value.dateControl,
      category: item.value.categories,
      note: item?.value?.noteControl,
     });
  }

  public async deleteTransaction(id: string): Promise<void> {
    return this.expensesRef.doc(id).delete();
  }

  public updateTransaction(item: any): Promise<void> {
    return this.expensesRef.doc(item.id).update(item);
  }
}
