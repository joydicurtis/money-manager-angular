import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  const mockData = [

  ]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should return data', () => {
    service.getCurrencyRate('USD').subscribe(data => {
      expect(data).toEqual(mockBook1);
    })
  })
});
