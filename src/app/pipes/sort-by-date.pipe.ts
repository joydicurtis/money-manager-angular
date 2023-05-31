import { Pipe, PipeTransform } from '@angular/core';
import { TransactionGroup } from '../shared/transaction-types';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: TransactionGroup[] = []): TransactionGroup[] {
    return value.sort((a, b) => new Date(b.key).getTime() - new Date(a.key).getTime());
  }
}
