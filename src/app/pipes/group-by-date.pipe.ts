import { Pipe, PipeTransform } from '@angular/core';
import { Transaction, TransactionGroup } from '../shared/transaction-types';

@Pipe({
  name: 'groupByDate'
})
export class GroupByDatePipe implements PipeTransform {
transform(value: Transaction[] = []): TransactionGroup[] {
    if(!value) {
      return [];
    }
    const grouppedData = value.reduce((prev: {[key: string]: Transaction[]}, cur: Transaction) => {
      if (!prev[String(cur['date'].toDate())]) {
        prev[String(cur['date'].toDate())] = [cur];
      } else {
        prev[String(cur['date'].toDate())].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(grouppedData).map(key => ({ key, data: grouppedData[key] }));
  }
}
