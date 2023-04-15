import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { TestData } from '../components/transactions/transaction-types';

@Injectable({
  providedIn: 'root'
})
export class HttpTestService {

  constructor(protected httpService: HttpService) {}

  getPosts(url: string): Observable<TestData[]> {
    return this.httpService.get(url);
  }
  postTestData(url: string, body: TestData): Observable<TestData> {
    return this.httpService.post(url, body);
  }
  putTestData(url: string, body: TestData, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.put(testUrl, body);
  }
  patchTestData(url: string, body: TestData, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.put(testUrl, body);
  }
  deleteTestData(url: string, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.delete(testUrl);
  }
}

