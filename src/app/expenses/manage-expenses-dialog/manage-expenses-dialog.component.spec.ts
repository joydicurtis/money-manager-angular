import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpensesDialogComponent } from './manage-expenses-dialog.component';

describe('ManageExpensesDialogComponent', () => {
  let component: ManageExpensesDialogComponent;
  let fixture: ComponentFixture<ManageExpensesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExpensesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExpensesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
