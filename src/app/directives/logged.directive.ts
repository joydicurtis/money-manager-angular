import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoggedIn]'
})
export class LoggedDirective implements OnInit {
  private isLoggedIn= false;

  @Input() set appLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn ;
    this.loginState();
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.loginState();
  }
  protected loginState() {
    if (this.isLoggedIn) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }
}
