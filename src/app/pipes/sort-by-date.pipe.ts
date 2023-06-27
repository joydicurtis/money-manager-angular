import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any[] = []): any[] {
    return value.sort((a, b) => new Date(b.key).getTime() - new Date(a.key).getTime());
  }
}
