import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDataComponent } from './currency-data.component';

describe('CurrencyDataComponent', () => {
  let component: CurrencyDataComponent;
  let fixture: ComponentFixture<CurrencyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
