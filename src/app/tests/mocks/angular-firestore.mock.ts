import { Observable, of } from 'rxjs';

class AngularFirestoreCollectionMock {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  add = jest.fn().mockReturnValue(Promise.resolve({ id: 'mockId' }));
  doc = jest.fn().mockImplementation((documentPath: string) => {
    return {
      set: jest.fn().mockReturnValue(Promise.resolve()),
      update: jest.fn().mockReturnValue(Promise.resolve()),
      delete: jest.fn().mockReturnValue(Promise.resolve())
    };
  });
  valueChanges = jest.fn().mockReturnValue(of([]));
  stateChanges = jest.fn().mockReturnValue(of([]));
  auditTrail = jest.fn().mockReturnValue(of([]));
  snapshotChanges = jest.fn().mockReturnValue(of([]));
}

export { AngularFirestoreCollectionMock };
