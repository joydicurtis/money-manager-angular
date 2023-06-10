import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  getHttpRequestState(method, url, data?): Observable<unknown> {
    const xhr = new XMLHttpRequest();
    return new Observable((observer: Observer<any>) => {
      xhr.open(method, url, true);
      xhr.responseType = 'json';
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(data));
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
    return this.getHttpRequestState('GET', url);
  }

  post(url: string, data: any): Observable<any> {
    return this.getHttpRequestState('POST', url, data);
  }

  patch(url: string, data: any): Observable<any> {
    return this.getHttpRequestState('PATCH', url, data);
  }

  delete(url: string): Observable<any> {
    const xhr = new XMLHttpRequest();
    return new Observable((observer: Observer<any>) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 200) {
          observer.next(xhr);
        } else {
          observer.error(xhr);
        }
      };
      xhr.open("DELETE", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send();
    });
  }
}
