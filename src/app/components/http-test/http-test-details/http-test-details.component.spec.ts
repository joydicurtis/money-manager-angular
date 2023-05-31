import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestDetailsComponent } from './http-test-details.component';

describe('HttpTestDetailsComponent', () => {
  let component: HttpTestDetailsComponent;
  let fixture: ComponentFixture<HttpTestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
