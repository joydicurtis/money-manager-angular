import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { HttpTestService } from 'src/app/services/http-test.service';
import { TestData } from '../../shared/transaction-types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BlogItemUpdateDialogComponent } from './blog-item-update-dialog/blog-item-update-dialog.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'http-test',
  },
})
export class BlogComponent implements OnInit {
  testData?: TestData[];
  anotherData?: TestData[];
  testUrl = 'http://localhost:3000/posts/';
  httpTestDialogRef!: MatDialogRef<BlogItemUpdateDialogComponent>;

  constructor(protected currencyService: CurrencyService, protected httpTestService: HttpTestService, public dialog: MatDialog, public renderer: Renderer2) {}

  ngOnInit() {
    this.getHttpTest();
  }

  protected openHttpTestDialog(articleData?: TestData) {
    this.httpTestDialogRef = this.dialog.open(BlogItemUpdateDialogComponent, { data: articleData });
    this.httpTestDialogRef.afterClosed().subscribe((item) => {
      if (item) {
        this.addTestItem(item);
      }
    });
  }

  protected openEditDialog(articleData?: TestData) {
    this.httpTestDialogRef = this.dialog.open(BlogItemUpdateDialogComponent, { data: articleData });
    this.httpTestDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.updateTestItem(data, articleData.id);
      }
    });
  }

  getHttpTest(): void {
    this.httpTestService.getPosts(this.testUrl).subscribe(data => this.testData = data);
  }

  addTestItem(formData: FormGroup): void {
    if (formData)  {
      const data = {
        title: formData.controls['titleControl'].value,
        body: formData.controls['bodyControl'].value,
        tags: formData.controls['tags'].value,
        date: new Date()
      }
      this.httpTestService.postTestData(this.testUrl, data).subscribe();
      this.getHttpTest();
    }
  }

  updateTestItem(formData: FormGroup, id: number) {
    const data = {
      id: id,
      title: formData.controls['titleControl'].value,
      body: formData.controls['bodyControl'].value,
      tags: formData.controls['tags'].value,
      date: new Date()
    }
    this.httpTestService.patchTestData(this.testUrl, data).subscribe();
    this.getHttpTest();
  }

  deleteTestItem(item: TestData) {
    this.httpTestService.deleteTestData(this.testUrl, item.id).subscribe();
    this.getHttpTest();
  }
}
