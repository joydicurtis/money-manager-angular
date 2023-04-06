import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { CurrencyData } from '../components/transactions/transaction-types';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  xhr = new XMLHttpRequest();
  apiKey = '6550c273190533ff21030121'
  requestURL = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/USD`;
  getCurrencyRate(): Observable<CurrencyData> {
    return new Observable((observer: Observer<CurrencyData>) => {
      console.log(observer, typeof(observer));
      this.xhr.open('GET', this.requestURL);
      this.xhr.responseType = 'json';
      this.xhr.send();
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState === 4) {
          if (this.xhr.status === 200) {
            observer.next(this.xhr.response);
            observer.complete();
          }
          else {
            observer.error(this.xhr.response);
          }
        }
      };
      this.xhr.open('GET', this.requestURL);
      this.xhr.send();
    });
  }
}
