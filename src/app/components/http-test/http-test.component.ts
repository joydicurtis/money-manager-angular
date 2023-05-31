import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { HttpTestService } from 'src/app/services/http-test.service';
import { TestData } from '../../shared/transaction-types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpTestDialogComponent } from './http-test-dialog/http-test-dialog.component';
@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'http-test',
  },
})
export class HttpTestComponent implements OnInit {
  testData?: TestData[];
  anotherData?: TestData[];
  testUrl = 'http://localhost:3000/posts';
  httpTestDialogRef!: MatDialogRef<HttpTestDialogComponent>;

  constructor(protected currencyService: CurrencyService, protected httpTestService: HttpTestService, public dialog: MatDialog, public renderer: Renderer2) {}

  ngOnInit() {
    this.getHttpTest();
  }

  protected openHttpTestDialog() {
    this.httpTestDialogRef = this.dialog.open(HttpTestDialogComponent);
    this.httpTestDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.addTestItem(data);
      }
    });
  }

  getHttpTest(): void {
    this.httpTestService.getPosts(this.testUrl).subscribe(data => this.testData = data);
  }

  addTestItem(formData: any) {
    let id = 1;
    if (this.testData && this.testData.length && this.testData[this.testData.length-1]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id = (this.testData[this.testData.length-1].id!) + 1;
    }
    const data = {
      id: id,
      title: formData.controls['titleControl'].value,
      body: formData.controls['bodyControl'].value,
      tags: formData.controls['tags'].value
    }
    this.httpTestService.postTestData(this.testUrl, data).subscribe();
    this.getHttpTest();
  }

  putTestItem(id: number) {
    const postData = {
      title: 'foo1',
      body: 'bar',
      userId: 2,
    };
    this.httpTestService.putTestData(this.testUrl, postData, id).subscribe(data => console.log(data));
    this.getHttpTest();
  }

  patchTestItem(id: number) {
    const postData = {
      id: 1,
      title: 'foo',
      body: '...',
      userId: 1
    }
    this.httpTestService.patchTestData(this.testUrl, postData, id).subscribe();
    this.getHttpTest();
  }

  deleteTestItem(id: number) {
    this.httpTestService.deleteTestData(this.testUrl, id).subscribe();
    this.getHttpTest();
  }
}
