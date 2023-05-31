import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestTooltipComponent } from './http-test-tooltip.component';

describe('HttpTestTooltipComponent', () => {
  let component: HttpTestTooltipComponent;
  let fixture: ComponentFixture<HttpTestTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTestTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpTestTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
