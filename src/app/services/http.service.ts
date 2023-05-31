import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getRequestState(method: string, url: string, data?: any) {
    const xhr = new XMLHttpRequest();
    return new Observable((observer: Observer<any>) => {
      xhr.open(method, url);
      xhr.responseType = 'json';
      // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          observer.next(xhr.response);
          observer.complete();
        } else {
          observer.error(xhr.response);
        }
      };
    });
  }

  get(url: string): Observable<any> {
    return this.getRequestState('GET', url);
  }

  post(url: string, data: any): Observable<any> {
    return this.getRequestState('POST', url, data);
  }

  patch(url: string, data: any): Observable<any> {
    return this.getRequestState('PATCH', url, data);
  }

  put(url: string, data: any): Observable<any> {
    return this.getRequestState('PUT', url, data);
  }

  delete(url: string): Observable<any> {
    return this.getRequestState('DELETE', url);
  }
}
