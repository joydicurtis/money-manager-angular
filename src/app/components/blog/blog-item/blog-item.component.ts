import { Component, ComponentRef, ElementRef, EventEmitter, Inject, Injector, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { BlogItemTooltipComponent } from '../blog-item-tooltip/blog-item-tooltip.component';
import { DOCUMENT } from '@angular/common';
import { TestData } from 'src/app/shared/transaction-types';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  animations: [
    trigger('deleteItem', [
      state('initial', style({ height: '*' })),
      state('deleted', style({ transform: 'translateX(-100%)' })),
      transition('initial <=> deleted', animate('0.3s')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'blog-item',
  },
})
export class BlogItemComponent {
  constructor(protected injector: Injector, @Inject(DOCUMENT) private document: Document) {}
  isDynamicTooltipVisible = false;
  expanded = false;
  isDeleted = false;
  state = 'initial';
  protected componentRef!: ComponentRef<BlogItemTooltipComponent>;
  @Output() deleteEvent = new EventEmitter<TestData>();
  @Output() editEvent = new EventEmitter<TestData>();
  @ViewChild('dynamic', { read: ViewContainerRef }) protected viewRef!: ViewContainerRef;
  @Input() item: any;

  showDynamicComponent() {
    const ngContent = this.createNgContent(this.item.body);
    const options= {
      injector: this.injector,
      projectableNodes: ngContent
    }
    if (this.isDynamicTooltipVisible) {
      this.viewRef?.clear();
      this.componentRef = this.viewRef.createComponent(BlogItemTooltipComponent, options);
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

  updateBlogArticle(value: TestData) {
    this.editEvent.emit(value);
  }

  deleteItem(value: TestData) {
    this.isDeleted = !this.isDeleted;
    this.state = this.isDeleted ? 'deleted' : 'initial';
    setTimeout(() => {
      this.deleteEvent.emit(value);
    }, 300);
  }

  editItem(value: TestData) {
    this.editEvent.emit(value);
  }
}
