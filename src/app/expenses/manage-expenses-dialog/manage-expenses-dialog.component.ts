import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { expensesCategories } from './categories.const';

@Component({
  selector: 'app-manage-expenses-dialog',
  templateUrl: './manage-expenses-dialog.component.html',
  styleUrls: ['./manage-expenses-dialog.component.scss']
})
export class ManageExpensesDialogComponent {
  date: any;
  expensesCategories: any;
  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<ManageExpensesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.expensesCategories = expensesCategories;
    this.dialogRef = dialogRef;
    this.data = data;
  }

  description: any;
  dateControl!: FormControl;
  operationFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  formData: any;
  ngOnInit() {
    this.operationFormGroup = this.fb.group({
      sumControl: this.fb.control('', [Validators.required, Validators.pattern(/^[1-9]\d*([\,\.]\d{2})?$/)]),
      dateControl: this.fb.control(new Date(), Validators.required),
      noteControl: this.fb.control(''),
      categories: this.fb.control(this.expensesCategories[0], Validators.required)
    });
    if (this.data) {
      this.loadData();
    }
  }

  loadData() {
    console.log('data', this.data);
    if (this.data) {
      this.operationFormGroup.setValue({sumControl: this.data.sum, categories: this.expensesCategories[this.data.category.id], dateControl: this.data.date.toDate(), noteControl: this.data.note});
    }
  }

  submit(form: any) {
    this.isSubmitted = true;
    if (!this.data) {
      this.data = form;
    }
    else {
      this.data.sum = form.controls.sumControl.value;
      this.data.date = form.controls.dateControl.value;
      this.data.category = form.controls.categories.value;
      this.data.note = form.controls.noteControl.value;
    }
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
