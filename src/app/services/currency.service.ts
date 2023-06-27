import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyData } from '../shared/transaction-types';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  xhr = new XMLHttpRequest();

  constructor(protected httpService: HttpService) {}

  getCurrencyRate(url: string): Observable<CurrencyData> {
    return this.httpService.get(url);
  }
}
