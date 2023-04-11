import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { CurrencyData } from '../components/transactions/transaction-types';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  xhr = new XMLHttpRequest();
  apiKey = '6550c273190533ff21030121'


  getCurrencyRate(cur: string): Observable<CurrencyData> {
    const requestURL = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${cur}`;
    return new Observable((observer: Observer<CurrencyData>) => {
      this.xhr.open('GET', requestURL);
      this.xhr.responseType = 'json';
      this.xhr.send();
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState !== 4) {
          return;
        }

        if (this.xhr.status === 200) {
          observer.next(this.xhr.response);
          observer.complete();
        } else {
          observer.error(this.xhr.response);
        }
      };
    });
  }
}
