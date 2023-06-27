import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private getHttpRequestState(method: string, url: string, data?: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
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

      data ? xhr.send(JSON.stringify(data)) : xhr.send();
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
    return this.getHttpRequestState('DELETE', url);
  }
}
