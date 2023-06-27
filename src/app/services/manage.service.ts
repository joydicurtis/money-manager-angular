import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Transaction } from '../shared/transaction-types';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})

export class ManageService {
  private dbPath = '/transactions';

  expensesRef: AngularFirestoreCollection<Transaction>;

  constructor(private db: AngularFirestore) {
    this.expensesRef = db.collection(this.dbPath);
  }

  public getTransactions(): AngularFirestoreCollection<Transaction> {
    return this.expensesRef;
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
