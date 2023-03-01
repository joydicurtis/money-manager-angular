import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingItemComponent } from './incoming-item.component';

describe('IncomingItemComponent', () => {
  let component: IncomingItemComponent;
  let fixture: ComponentFixture<IncomingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
