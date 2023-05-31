import { Component, ComponentRef, ElementRef, Inject, Injector, Input, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { HttpTestTooltipComponent } from '../http-test-tooltip/http-test-tooltip.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-http-test-item',
  templateUrl: './http-test-item.component.html',
  styleUrls: ['./http-test-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'post',
  },
})
export class HttpTestItemComponent {
  constructor(protected injector: Injector, @Inject(DOCUMENT) private document: Document) {}
  isDynamicTooltipVisible = false;
  expanded = false;
  @ViewChild('dynamic', { read: ViewContainerRef }) protected viewRef!: ViewContainerRef;
  @Input() item: any;
  protected componentRef!: ComponentRef<HttpTestTooltipComponent>;

  showDynamicComponent() {
    const ngContent = this.createNgContent(this.item.body);
    const options= {
      injector: this.injector,
      projectableNodes: ngContent
    }
    if (this.isDynamicTooltipVisible) {
      this.viewRef?.clear();
      this.componentRef = this.viewRef.createComponent(HttpTestTooltipComponent, options);
      this.expanded = true;
    } else {
      this.viewRef?.clear();
      this.expanded = false;
    }
  }
  createNgContent(content: ElementRef) {
    if (typeof content === 'string') {
      const element = this.document.createElement('div');
      element.innerHTML=content;
      return [[element]];
    }
    return [[]]
  }
}
