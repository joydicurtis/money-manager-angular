import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ManageService } from '../../services/manage.service';
import { Subject, map, takeUntil } from 'rxjs';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'chart',
  },
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') public chartElement: ElementRef;
  @Input() public transactions: any;
  destroyed = new Subject();
  dataArray: any;
  chart: any;

  public constructor(private _manageService: ManageService) {}

  public ngAfterViewInit() {
    console.log(this.chartElement);
    if (this.chartElement) {
      this._manageService.getTransactions().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).pipe(takeUntil(this.destroyed)).subscribe(data => {
          if (this.chart) {
            this.chart.destroy();
          }
          this.transactions = data;
            this.dataArray = [
              {
                key: 'Incomes', sum: data.filter((item) => item.type.value === 'income').reduce((sum, current) => sum + current.sum, 0)
              },
              {
                key: 'Expenses', sum: data.filter((item) => item.type.value === 'expense').reduce((sum, current) => sum + current.sum, 0)
              },
            ];
            this.chart = new Chart(
                this.chartElement.nativeElement,
              {
                type: 'pie',
                data: {
                  labels: this.dataArray.map(row => row.key ),
                  datasets: [
                    {
                      data: this.dataArray.map(row => row.sum),
                      backgroundColor: ["#009688", "#FF4081"],
                    }
                  ]
                }
              });
              console.log(this.dataArray);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroyed.next(this);
    this.destroyed.complete();
  }
}
