import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestDialogComponent } from './http-test-dialog.component';

describe('HttpTestDialogComponent', () => {
  let component: HttpTestDialogComponent;
  let fixture: ComponentFixture<HttpTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTestDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
