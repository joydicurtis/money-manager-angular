import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { TestData } from '../shared/transaction-types';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpTestService {

  constructor(protected httpService: HttpService, private serializer: UrlSerializer) {}

  getPosts(url: string): Observable<TestData[]> {
    return this.httpService.get(url);
  }

  getPostByTitle(url: string, title: string): Observable<any> {
    const testUrl = `${url}${title.split(' ').join('%20')}`;
    return this.httpService.get(testUrl).pipe(
      catchError(error => {
          if (error.error instanceof ErrorEvent) {
              console.log(`Error: ${error.error.message}`);
          } else {
            console.log(`Error: ${error.message}`);
          }
          return of([]);
      })
    )
  }

  getPostById(url: string, id: number): Observable<any> {
    const testUrl = `${url}/${id}`;
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

  putTestData(url: string, body: TestData, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.put(testUrl, body);
  }
  patchTestData(url: string, body: TestData, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.patch(testUrl, body);
  }
  deleteTestData(url: string, id: number): Observable<TestData> {
    const testUrl = url + id;
    return this.httpService.delete(testUrl);
  }
}

