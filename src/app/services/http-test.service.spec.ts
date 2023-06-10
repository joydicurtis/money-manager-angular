import { HttpTestService } from './http-test.service';
import { HttpService } from './http.service';
import { Subject, of, takeUntil } from 'rxjs';

describe('HttpTestService', () => {
  let service: HttpTestService;
  const destroy$$: Subject<void> = new Subject<void>();
  const apiBaseUrl = 'https://jsonplaceholder.typicode.com/todos/';

  const mockItem = {
    "userId": 2,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };

  const mockPostItem = {
    "userId": 2,
    "id": mockItem.id,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };

  const mockPostItems = [
    {
      "userId": 2,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 2,
      "id": 2,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  ];

  const httpCustomService = new HttpService();

  beforeEach(() => {
    service = new HttpTestService(httpCustomService);
  });

  afterEach(() => {
    destroy$$.next();
    jest.resetAllMocks();
  });

  afterAll(() => {
    destroy$$.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all post items', (done: jest.DoneCallback) => {
    const mockHttpService = jest.spyOn(httpCustomService, 'get').mockReturnValue(of(mockPostItems));
    service
      .getPosts(apiBaseUrl)
      .pipe(takeUntil(destroy$$))
      .subscribe((item) => {
        expect(item).toEqual(mockPostItems);
        expect(mockHttpService).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/');
        done();
      })
  })

  it('should get post by id', (done: jest.DoneCallback) => {
    const postId = mockItem.id;
    const mockHttpService = jest.spyOn(httpCustomService, 'get').mockReturnValue(of(mockPostItem));
    service
      .getPostById(apiBaseUrl, postId)
      .pipe(takeUntil(destroy$$))
      .subscribe((item) => {
        expect(item).toEqual(mockPostItem);
        expect(mockHttpService).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${postId}`);
        done();
      })
  })

  it('should add new post', (done: jest.DoneCallback) => {
    const mockHttpService = jest.spyOn(httpCustomService, 'post').mockReturnValue(of(mockPostItem));
    service
      .postTestData(apiBaseUrl, mockItem)
      .pipe(takeUntil(destroy$$))
      .subscribe((item) => {
        expect(item).toEqual(mockPostItem);
        expect(mockHttpService).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/', mockItem);
        done();
      })
  })

  it('should update a post', (done: jest.DoneCallback) => {
    const mockHttpService = jest.spyOn(httpCustomService, 'patch').mockReturnValue(of(mockPostItem));
    service
      .patchTestData(apiBaseUrl, mockItem)
      .pipe(takeUntil(destroy$$))
      .subscribe((item) => {
        expect(item).toEqual(mockPostItem);
        expect(mockHttpService).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${mockItem.id}`, mockItem);
        done();
      })
  })

  it('should delete a post', (done: jest.DoneCallback) => {
    const mockHttpService = jest.spyOn(httpCustomService, 'delete').mockReturnValue(of(mockPostItem));
    service
      .deleteTestData(apiBaseUrl, mockItem.id)
      .pipe(takeUntil(destroy$$))
      .subscribe((item) => {
        expect(item).toEqual(mockPostItem);
        expect(mockHttpService).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${mockItem.id}`);
        done();
      })
  })
});
