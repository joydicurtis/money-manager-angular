import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyData } from '../shared/transaction-types';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  xhr = new XMLHttpRequest();
  apiKey = '6550c273190533ff21030121';

  constructor(protected httpService: HttpService) {}

  getCurrencyRate(cur: string): Observable<CurrencyData> {
    const requestURL = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${cur}`;
    return this.httpService.get(requestURL);
  }
}
