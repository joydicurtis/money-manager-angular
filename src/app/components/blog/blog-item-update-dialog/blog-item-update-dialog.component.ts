import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogService } from 'src/app/services/blog.service';
import { TestData } from '../../../shared/transaction-types';
import { minLengthValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-blog-item-update-dialog',
  templateUrl: './blog-item-update-dialog.component.html',
  styleUrls: ['./blog-item-update-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'http-test-dialog transaction-dialog',
  },
})
export class BlogItemUpdateDialogComponent implements OnInit {
  httpTestForm!: FormGroup;
  isSubmitted = false;
  url = 'http://localhost:3000/posts/'
  constructor(private dialogRef: MatDialogRef<BlogItemUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: TestData, protected blogService: BlogService,) {
  }

  ngOnInit() {
    this.httpTestForm = new FormGroup({
      titleControl: new FormControl('', [minLengthValidator(3)]),
      bodyControl: new FormControl('', [minLengthValidator(3)]),
      tags: new FormArray([
        new FormControl('', [minLengthValidator(1)])
      ])
    });
    if (this.dialogData) {
      this.loadData();
    }
  }

  get aliasesArrayControl() {
    return ((this.httpTestForm.get('tags') as FormArray).controls);
  }

  get tagsControl() {
    return (this.httpTestForm.get('tags') as FormArray);
  }

  loadData() {
    this.httpTestForm.setValue({
      titleControl: this.dialogData.title,
      bodyControl: this.dialogData.body,
      tags: this.dialogData.tags
    });
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
