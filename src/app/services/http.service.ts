import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  get(url: string): Observable<any> {
    const xhr = new XMLHttpRequest();
    return new Observable((observer: Observer<any>) => {
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          observer.next(xhr.response);
          observer.complete();
        } else {
          observer.error(xhr.response);
        }
      };
    });
  }

  post(url: string, data: any): Observable<any> {
    const xhr = new XMLHttpRequest();
    return new Observable((observer: Observer<any>) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 201) {
          observer.next(xhr);
        } else {
          observer.error(xhr);
        }
      };
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(data));
    });
  }

  put(url: string, data: any): Observable<any> {
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
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(data));
    });
  }

  patch(url: string, data: any): Observable<any> {
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
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhr.send(JSON.stringify(data));
    });
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
