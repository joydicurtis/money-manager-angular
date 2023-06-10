import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, catchError, of } from 'rxjs';
import { TestData } from '../shared/transaction-types';

@Injectable({
  providedIn: 'root'
})
export class HttpTestService {

  constructor(protected httpService: HttpService) {}

  getPosts(url: string): Observable<TestData[]> {
    return this.httpService.get(url);
  }

  getPostById(url: string, id: number): Observable<TestData> {
    const testUrl = `${url}${id}`;
    return this.httpService.get(testUrl).pipe(
      catchError(error => {
          if (error.error instanceof ErrorEvent) {
              console.log(`Error: ${error.error.message}`);
          } else {
            console.log(`Error: ${error.message}`);
          }
          return of([]);
      })
  );
  }

  postTestData(url: string, body: TestData): Observable<TestData> {
    return this.httpService.post(url, body);
  }

  patchTestData(url: string, body: TestData): Observable<TestData> {
    const testUrl = url + body.id;
    return this.httpService.patch(testUrl, body);
  }

  deleteTestData(url: string, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.delete(testUrl);
  }
}

