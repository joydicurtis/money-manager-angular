import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, dialogData, Transaction, TransactionType } from '../transaction-types';
import { incomesCategories } from './categories.const';
import { expensesCategories } from './categories.const';

@Component({
  selector: 'app-transactions-dialog',
  templateUrl: './transactions-dialog.component.html',
  styleUrls: ['./transactions-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'transaction-dialog',
  },
})

export class TransactionsDialogComponent implements OnInit {
  date!: string;
  categories!: Category[];
  isIncomes?: boolean = false;
  isExpenses?: boolean = false;
  data: Transaction;
  transactionFormGroup!: FormGroup;
  isSubmitted = false;
  selectedType!: TransactionType;

  transactionTypes: TransactionType[] = [
    { value: 'income', name: 'Income' },
    { value: 'expense', name: 'Expense' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: dialogData
  ) {
    this.dialogRef = dialogRef;
    this.data = dialogData.item;
    this.isIncomes = dialogData.incomesMode;
    this.isExpenses = dialogData.expensesMode;
  }

  ngOnInit() {
    if (this.isIncomes) {
      this.onTypeChange(this.transactionTypes[0]);
      this.categories = incomesCategories;
    }
    else if (this.isExpenses) {
      this.onTypeChange(this.transactionTypes[1]);
      this.categories = expensesCategories;
    }

    this.transactionFormGroup = this.fb.group({
      typeControl: this.fb.control(this.selectedType, Validators.required),
      amountControl: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*([,.]\d{2})?$/),
      ]),
      dateControl: this.fb.control(new Date(), Validators.required),
      noteControl: this.fb.control(''),
      categories: this.fb.control('', Validators.required),
    });
    if (this.data) {
      this.onTypeChange(
        this.data.type.value === this.transactionTypes[0].value
          ? this.transactionTypes[0]
          : this.transactionTypes[1]
      );
      this.loadData(this.selectedType);
    }
  }

  onTypeChange(value: TransactionType) {
    this.selectedType = value;
    value === this.transactionTypes[0]
      ? (this.categories = incomesCategories)
      : (this.categories = expensesCategories);
  }

  loadData(selectedType: TransactionType) {
    if (selectedType) {
      this.transactionFormGroup.setValue({
        typeControl: selectedType,
        amountControl: this.data.sum,
        dateControl: this.data.date.toDate(),
        categories: this.categories[this.data.category.id],
        noteControl: this.data.note,
      });
    }
  }

  submit() {
    this.isSubmitted = true;
    if (this.transactionFormGroup.valid) {
      this.dialogRef.close(this.data ? this.collectedData(this.data) : this.transactionFormGroup);
    }
  }

  protected collectedData(data: Transaction) {
    data.type = this.transactionFormGroup.controls['typeControl'].value;
    data.sum = this.transactionFormGroup.controls['amountControl'].value;
    data.date = this.transactionFormGroup.controls['dateControl'].value;
    data.category = this.transactionFormGroup.controls['categories'].value;
    data.note = this.transactionFormGroup.controls['noteControl'].value;
    console.log('data', data);
    return data;
  }

  close() {
    this.dialogRef.close();
  }
}
