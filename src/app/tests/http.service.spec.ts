import { lastValueFrom, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';

describe('HttpService', () => {
  let service: HttpService;
  const apiBaseUrl = 'https://jsonplaceholder.typicode.com/';

  const xhrMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    status: 200,
    response: {
      "userId": 2,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  };

  const xhrMockNegative: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    status: 404,
    response: 'Not found'
  };

  const mockItem = {
    "userId": 2,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };

  beforeEach(() => {
    service = new HttpService();
  });

  xit('should make a GET request', async () => {
    jest.spyOn(window, 'XMLHttpRequest').mockReturnValue(xhrMock as XMLHttpRequest);

    const requestPromise = lastValueFrom(service.get(apiBaseUrl));

    // Simulate the XHR event
    (xhrMock.onreadystatechange as EventListener)(new Event('readystatechange'));

    // Wait for the promise to resolve
    const response = await requestPromise;

    expect(xhrMock.open).toBeCalledWith('GET', apiBaseUrl, true);
    expect(xhrMock.setRequestHeader).toBeCalledWith('Content-Type', 'application/json; charset=UTF-8');
    expect(xhrMock.send).toBeCalledWith();
    expect(xhrMock.readyState).toBe(4);
    expect(xhrMock.status).toBe(200);
    expect(response).toEqual(mockItem);
  });

  xit('should make a POST request', async () => {
    jest.spyOn(window, 'XMLHttpRequest').mockReturnValue(xhrMock as XMLHttpRequest);

    const requestPromise = lastValueFrom(service.post(apiBaseUrl, mockItem));

    // Simulate the XHR event
    (xhrMock.onreadystatechange as EventListener)(new Event('readystatechange'));

    // Wait for the promise to resolve
    const response = await requestPromise;

    expect(xhrMock.open).toBeCalledWith('POST', apiBaseUrl, true);
    expect(xhrMock.setRequestHeader).toBeCalledWith('Content-Type', 'application/json; charset=UTF-8');
    expect(xhrMock.send).toBeCalledWith(JSON.stringify({
      "userId": 2,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }));
    expect(xhrMock.readyState).toBe(4);
    expect(xhrMock.status).toBe(200);
    expect(response).toEqual(mockItem);
  });

  xit('should make a PATCH request', async () => {
    jest.spyOn(window, 'XMLHttpRequest').mockReturnValue(xhrMock as XMLHttpRequest);

    const requestPromise = lastValueFrom(service.patch(apiBaseUrl, mockItem));

    // Simulate the XHR event
    (xhrMock.onreadystatechange as EventListener)(new Event('readystatechange'));

    // Wait for the promise to resolve
    const response = await requestPromise;

    expect(xhrMock.open).toBeCalledWith('PATCH', apiBaseUrl, true);
    expect(xhrMock.setRequestHeader).toBeCalledWith('Content-Type', 'application/json; charset=UTF-8');
    expect(xhrMock.send).toBeCalledWith(JSON.stringify({
      "userId": 2,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }));
    expect(xhrMock.readyState).toBe(4);
    expect(xhrMock.status).toBe(200);
    expect(response).toEqual(mockItem);
  });

  it('should make a GET request111', () => {
    // jest.spyOn(window, 'XMLHttpRequest').mockReturnValue(xhrMockNegative as XMLHttpRequest);
    // (xhrMockNegative.onreadystatechange as EventListener)(new Event('readystatechange'));
    const xhrMockClass = () => xhrMockNegative;

    // @ts-ignore
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
    service.get(apiBaseUrl).subscribe(() => {
      console.log('success');
    }, (error) => {
      console.log('error', error);
    })
    // @ts-ignore
    xhrMockNegative['onreadystatechange']();
    // (xhrMockNegative.onreadystatechange as EventListener)(new Event('readystatechange'));
    // try {
    //   requestPromise;
    // }
    // catch (e) {
    //   expect(xhrMockNegative.open).toBeCalledWith('GET', apiBaseUrl, true);
    //   expect(xhrMockNegative.setRequestHeader).toBeCalledWith('Content-Type', 'application/json; charset=UTF-8');
    //   expect(xhrMockNegative.send).toBeCalledWith();
    //   expect(xhrMockNegative.readyState).toBe(4);
    //   expect(xhrMockNegative.status).toBe(404);
    //   expect(xhrMockNegative.response).toEqual('Not found');
    // }
  });
});
