import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowOnFocus], [show-on-focus]'
})
export class ShowOnFocusDirective {

  @HostListener('focus') onFocus() {
    this.el.nativeElement.classList.add('transaction-item--focused');
  }

  @HostListener('focusout') outOfFocus() {
    this.el.nativeElement.classList.remove('transaction-item--focused');
  }

  constructor(private el: ElementRef) {}
}
