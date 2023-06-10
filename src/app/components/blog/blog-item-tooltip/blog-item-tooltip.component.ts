import { Component, ViewEncapsulation } from '@angular/core';
import { fadeInOutTrigger } from 'src/app/shared/animations';

@Component({
  selector: 'app-blog-item-tooltip',
  templateUrl: './blog-item-tooltip.component.html',
  styleUrls: ['./blog-item-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'http-test-tooltip',
    '[@fadeInOut]': 'in'
  },
  animations: [fadeInOutTrigger]
})
export class BlogItemTooltipComponent {}
