import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

describe('AuthService', () => {
  let service: AuthService;
  let angularFirestoreMock: AngularFirestore;
  let collectionMock: AngularFirestoreCollection<any>;

  beforeEach(() => {
    collectionMock = {
      add: jest.fn().mockReturnValue(Promise.resolve({ email: 'test@example.com', password: 'password' })),
    } as any;

    angularFirestoreMock = {
      collection: jest.fn(() => collectionMock),
    } as any;

    service = new AuthService(angularFirestoreMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isSignedIn to true on log in', (done) => {
    service.logIn();
    service.isLoggedIn.subscribe(res => {
      expect(res).toBe(true);
      done();
    })
  });

  it('should set isSignedIn to false on log out', (done) => {
    service.logOut();
    service.isLoggedIn.subscribe(res => {
      expect(res).toBe(false);
      done();
    })
  });

  it('should return the isSignedIn BehaviorSubject in canActivate()', (done) => {
    let result;
    service.isLoggedIn.subscribe(res => {
      result = res;
      done();
    })
    expect(result).toBe(service.canActivate().getValue());
  });

  it('should add a user', async () => {
    const mockItem = { value: { emailControl: 'test@example.com', passwordControl: 'password' }};
    const mockItemRes = { email: 'test@example.com', password: 'password' };
    const addSpy = jest.spyOn(collectionMock, 'add');
    const result = await service.addUsers(mockItem);
    expect(addSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(result).toEqual(mockItemRes);
  });
});
