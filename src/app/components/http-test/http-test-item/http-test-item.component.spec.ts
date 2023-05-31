import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestItemComponent } from './http-test-item.component';

describe('HttpTestItemComponent', () => {
  let component: HttpTestItemComponent;
  let fixture: ComponentFixture<HttpTestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTestItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpTestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
