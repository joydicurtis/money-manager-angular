import { Injectable } from '@angular/core';
import { CurrencyData } from '../components/transactions/transaction-types';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiKey = '6550c273190533ff21030121'
  requestURL = 'https://v6.exchangerate-api.com/v6/6550c273190533ff21030121/latest/USD'

  getCurrencyRate(): Promise<CurrencyData> {
    return fetch(this.requestURL).then(res => res.json()).then(res => {return res as CurrencyData});
  }
}
