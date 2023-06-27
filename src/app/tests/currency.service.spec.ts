import { Subject, of, takeUntil } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { HttpService } from '../services/http.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  const destroy$$: Subject<void> = new Subject<void>();
  const apiBaseUrl = 'https://jsonplaceholder.typicode.com/todos/';
  const httpCustomService = new HttpService();

  const mockData = {
    "base_code":"USD",
    "conversion_rates":{
     "USD":1,
     "EUR":0.9323,
     "UAH":36.9098,
    }
  }

  beforeEach(() => {
    service = new CurrencyService(httpCustomService);
  });

  afterEach(() => {
    destroy$$.next();
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get currency data', (done: jest.DoneCallback) => {
    const mockHttpService = jest.spyOn(httpCustomService, 'get').mockReturnValue(of(mockData));
    service
      .getCurrencyRate(apiBaseUrl)
      .pipe(takeUntil(destroy$$))
      .subscribe((item) => {
        expect(item).toEqual(mockData);
        expect(mockHttpService).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/');
        done();
      })
  })
});
