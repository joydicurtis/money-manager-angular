import { Component, EventEmitter, Inject, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { incomingsCategories } from './categories.const';
@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'dialog'
  }
})
export class ManageDialogComponent implements OnInit {
  date: any;
  incomingsCategories: any;
  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<ManageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.incomingsCategories = incomingsCategories;
    this.dialogRef = dialogRef;
    this.data = data;
  }

  description: any;
  dateControl!: FormControl;
  operationFormGroup!: FormGroup;
  editOperationFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  formData: any;
  ngOnInit() {
    this.operationFormGroup = this.fb.group({
      sumControl: this.fb.control('', [Validators.required, Validators.pattern(/^[1-9]\d*([\,\.]\d{2})?$/)]),
      dateControl: this.fb.control(new Date(), Validators.required),
      noteControl: this.fb.control(''),
      categories: this.fb.control(this.incomingsCategories[0], Validators.required)
    });
    if (this.data) {
      this.loadData();
    }
  }

  // getFormData(value: any) {
  //   this.newItemEvent.emit(value)
  // }

  loadData() {
    if (this.data) {
      this.operationFormGroup.setValue({sumControl: this.data.sum, categories: this.incomingsCategories[this.data.category.id], dateControl: this.data.date.toDate(), noteControl: this.data.note});
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
