import { Component, ViewEncapsulation } from '@angular/core';
import { fadeInOutTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-http-test-tooltip',
  templateUrl: './http-test-tooltip.component.html',
  styleUrls: ['./http-test-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'http-test-tooltip',
    '[@fadeInOut]': 'in'
  },
  animations: [fadeInOutTrigger]
})
export class HttpTestTooltipComponent {}
