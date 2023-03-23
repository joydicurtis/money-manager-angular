import { Pipe, PipeTransform } from '@angular/core';
import { Transaction, TransactionGroup } from '../transactions/transaction-types';

@Pipe({
  name: 'groupByDate'
})
export class GroupByDatePipe implements PipeTransform {
transform(value: Transaction[] = []): TransactionGroup[] {
    if(value) {
      const grouppedData = value.reduce((prev: any, cur: any)=> {
        if(!prev[cur['date'].toDate().toLocaleDateString() as keyof Transaction]) {
            prev[cur['date'].toDate().toLocaleDateString()] = [cur];
        } else {
            prev[cur['date'].toDate().toLocaleDateString()].push(cur);
        }
        return prev;
      }, {});
      return Object.keys(grouppedData).map(key => ({ key, data: grouppedData[key] }));
    }
    else {
      return [];
    }
  }

}
