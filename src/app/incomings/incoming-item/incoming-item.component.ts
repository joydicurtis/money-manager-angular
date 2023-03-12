import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-incoming-item',
  templateUrl: './incoming-item.component.html',
  styleUrls: ['./incoming-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'incoming-item'
  }
})
export class IncomingItemComponent implements OnInit {
  @Input() item: any;
  date: any;
  ngOnInit () {
    this.date = this.item.date.toDate();
  }
}
