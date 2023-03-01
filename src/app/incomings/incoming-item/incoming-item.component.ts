import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-incoming-item',
  templateUrl: './incoming-item.component.html',
  styleUrls: ['./incoming-item.component.scss']
})
export class IncomingItemComponent implements OnInit {
  @Input() item: any;
  date: any;
  ngOnInit () {
    this.date = this.item.date.toDate();
  }
}
