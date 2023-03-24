import { Component, ViewEncapsulation } from '@angular/core';
import { Logger } from 'src/app/decorators/logger.decorator';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'tabs',
  },
})

export class TabsComponent {}
