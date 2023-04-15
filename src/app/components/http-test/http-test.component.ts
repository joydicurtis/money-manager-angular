import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { HttpTestService } from 'src/app/services/http-test.service';
import { TestData } from '../transactions/transaction-types';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {
  testData?: TestData[];
  testUrl = 'http://localhost:3000/posts/';
  constructor(protected currencyService: CurrencyService, protected httpTestService: HttpTestService) {}

  ngOnInit() {
    this.getHttpTest();
  }

  getHttpTest(): void {
    this.httpTestService.getPosts(this.testUrl).subscribe(data => this.testData = data);
  }

  addTestItem() {
    const postData = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    this.httpTestService.postTestData(this.testUrl, postData).subscribe();
  }

  putTestItem(id: number) {
    const postData = {
      title: 'foo1',
      body: 'bar',
      userId: 2,
    };
    this.httpTestService.putTestData(this.testUrl, postData, id).subscribe(data => console.log(data));
  }

  patchTestItem(id: number) {
    const postData = {
      id: 1,
      title: 'foo',
      body: '...',
      userId: 1
    }
    this.httpTestService.patchTestData(this.testUrl, postData, id).subscribe();
  }
  deleteTestItem(id: number) {
    this.httpTestService.deleteTestData(this.testUrl, id).subscribe();
  }
}
