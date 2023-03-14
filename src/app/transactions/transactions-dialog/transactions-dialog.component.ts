import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { incomingsCategories } from './categories.const';
import { expensesCategories } from './categories.const';

@Component({
  selector: 'app-transactions-dialog',
  templateUrl: './transactions-dialog.component.html',
  styleUrls: ['./transactions-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'transaction-dialog'
  }
})

export class TransactionsDialogComponent {
  date: any;
  categories: any;
  isIncomings: boolean = false;
  isExpenses: boolean = false;
  transactionFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  selectedType: any;

  transactionTypes: any = [
    { value: 'incoming', name: 'Incoming' },
    { value: 'expense', name: 'Expense' }
  ];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TransactionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.dialogRef = dialogRef;
    this.data = data.item;
    this.isIncomings = data.incomingsMode;
    this.isExpenses = data.expensesMode;
  }

  ngOnInit() {
    if (this.isIncomings) {
      this.onTypeChange(this.transactionTypes[0]);
      this.categories = incomingsCategories;
    }
    if (this.isExpenses) {
      this.onTypeChange(this.transactionTypes[1]);
      this.categories = expensesCategories;
    }

    this.transactionFormGroup = this.fb.group({
      typeControl: this.fb.control(this.selectedType, Validators.required),
      amountControl: this.fb.control('', [Validators.required, Validators.pattern(/^[1-9]\d*([\,\.]\d{2})?$/)]),
      dateControl: this.fb.control(new Date(), Validators.required),
      noteControl: this.fb.control(''),
      categories: this.fb.control('', Validators.required)
    });
    if (this.data) {
      this.onTypeChange((this.data.type.value === this.transactionTypes[0].value) ? this.transactionTypes[0] : this.transactionTypes[1]);
      this.loadData(this.selectedType);
    }
  }

  onTypeChange(value: any) {
    this.selectedType = value;
    value === (this.transactionTypes[0]) ? (this.categories = incomingsCategories) : (this.categories = expensesCategories);
  }

  loadData(selectedType: any) {
    if (selectedType) {
      this.transactionFormGroup.setValue({typeControl: selectedType, amountControl: this.data.sum, dateControl: this.data.date.toDate(), categories: this.categories[this.data.category.id], noteControl: this.data.note});
    }
  }

  submit(form: any) {
    this.isSubmitted = true;
    if (form.valid) {
      if (!this.data) {
        this.data = form
      }
      else {
        this.data.type = form.controls.typeControl.value;
        this.data.sum = form.controls.amountControl.value;
        this.data.date = form.controls.dateControl.value;
        this.data.category = form.controls.categories.value;
        this.data.note = form.controls.noteControl.value;
      }
      this.dialogRef.close(this.data);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
