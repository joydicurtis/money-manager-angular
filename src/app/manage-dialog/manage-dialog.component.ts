import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
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
  constructor(public dialogService: DialogService, private fb:FormBuilder) {
    this.incomingsCategories = incomingsCategories;
  }
  dateControl!: FormControl;
  incomingsCategories: any;
  operationFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  ngOnInit() {
    this.operationFormGroup = this.fb.group({
      sumControl: this.fb.control('', [Validators.required, Validators.pattern(/^[1-9]\d*([\,\.]\d{2})?$/)]),
      dateControl: this.fb.control(new Date(), Validators.required),
      noteControl: this.fb.control(''),
      categories: this.fb.control('', Validators.required)
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.operationFormGroup.valid) {
      return this.operationFormGroup.value;
    }
  }
}
