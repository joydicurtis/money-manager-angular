import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpTestService } from 'src/app/services/http-test.service';
import { Transaction } from '../../../shared/transaction-types';
import { minLengthValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-http-test-dialog',
  templateUrl: './http-test-dialog.component.html',
  styleUrls: ['./http-test-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'http-test-dialog transaction-dialog',
  },
})
export class HttpTestDialogComponent implements OnInit {
  httpTestForm!: FormGroup;
  isSubmitted = false;
  url = 'http://localhost:3000/posts/'
  constructor(private dialogRef: MatDialogRef<HttpTestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Transaction[], protected httpTestService: HttpTestService,) {
  }

  ngOnInit() {
    this.httpTestForm = new FormGroup({
      titleControl: new FormControl('', [minLengthValidator(3)]),
      bodyControl: new FormControl('', [minLengthValidator(3)]),
      tags: new FormArray([
        new FormControl('', [minLengthValidator(1)])
      ])
    })
  }

  searchUser(text: string) {
    return this.httpTestService.getPostByTitle(`http://localhost:3000/posts?title=`, text);
  }

  get aliasesArrayControl() {
    return ((this.httpTestForm.get('tags') as FormArray).controls);
  }

  get tagsControl() {
    return (this.httpTestForm.get('tags') as FormArray);
  }

  submit() {
    this.isSubmitted = true;
    if (!this.httpTestForm.valid) {
      this.httpTestForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.httpTestForm);
    }
  }

  deleteTag(index: number) {
    (this.httpTestForm.get('tags') as FormArray).removeAt(index);
  }

  addTag() {
    (this.httpTestForm.get('tags') as FormArray).push(new FormControl(''));
  }

  close() {
    this.dialogRef.close();
  }
}
