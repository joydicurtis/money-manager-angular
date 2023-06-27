import { ManageService } from '../../app/services/manage.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

describe('ManageService', () => {
  let service: ManageService;
  let angularFirestoreMock: AngularFirestore;
  let expensesRefMock: AngularFirestoreCollection<any>;
  let docMock: AngularFirestoreDocument<any>;

  const mockItem = {
    id: 'mockId',
    value: {
      typeControl: {
        name: 'Income',
        value: 'income'
      },
      amountControl: 4354365,
      dateControl: 1686606976,
      categories: {
        icon: 'savings',
        id: 2,
        name: 'Investments'
      },
      noteControl: ''
    }
  };

  const mockItemRes = {
    id: 'mockId',
    type:  {
      name: 'Income',
      value: 'income'
    },
    sum: 4354365,
    date: 1686606976,
    category: {
      icon: 'savings',
      id: 2,
      name: 'Investments'
    },
    note: ''
  };

  beforeEach(() => {
    docMock = {
      delete: jest.fn(),
      update: jest.fn(),
    } as any;

    expensesRefMock = {
      doc: jest.fn().mockReturnValue(docMock),
      add: jest.fn().mockReturnValue(Promise.resolve({
        id: 'mockId',
        type: {
          name: 'Income',
          value: 'income',
        },
        sum: 4354365,
        date: 1686606976,
        category: {
          icon: 'savings',
          id: 2,
          name: 'Investments',
        },
        note: '',
      })),
    } as any;

    angularFirestoreMock = {
      collection: jest.fn(() => expensesRefMock),
    } as any;

    service = new ManageService(angularFirestoreMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the transactions collection', () => {

    const result = service.getTransactions();

    expect(result).toBe(expensesRefMock);
  });

  it('should add a transaction', async () => {
    const addSpy = jest.spyOn(expensesRefMock, 'add');
    const result = await service.addTransaction(mockItem);
    expect(addSpy).toHaveBeenCalledWith({
      type:  {
        name: 'Income',
        value: 'income'
      },
      sum: 4354365,
      date: 1686606976,
      category: {
        icon: 'savings',
        id: 2,
        name: 'Investments'
      },
      note: ''
    });
    expect(result).toEqual(mockItemRes);
  });

  it('should update a transaction', async () => {
    const updateSpy = jest.spyOn(docMock, 'update').mockReturnValue(Promise.resolve(mockItem) as any);
    const result = await service.updateTransaction(mockItem);
    expect(expensesRefMock.doc).toHaveBeenCalledWith('mockId');
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'mockId',
      value: {
        typeControl: {
          name: 'Income',
          value: 'income'
        },
        amountControl: 4354365,
        dateControl: 1686606976,
        categories: {
          icon: 'savings',
          id: 2,
          name: 'Investments'
        },
        noteControl: ''
      }
    });
    expect(result).toEqual(mockItem);
  });

  it('should delete a transaction', async () => {
    const deleteSpy = jest.spyOn(docMock, 'delete');
    const mockId = 'mockId';

    await service.deleteTransaction(mockId);

    expect(expensesRefMock.doc).toHaveBeenCalledWith(mockId);
    expect(deleteSpy).toHaveBeenCalled();
  });
});
