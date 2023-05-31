import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestDetailsEditComponent } from './http-test-details-edit.component';

describe('HttpTestDetailsEditComponent', () => {
  let component: HttpTestDetailsEditComponent;
  let fixture: ComponentFixture<HttpTestDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTestDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpTestDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
