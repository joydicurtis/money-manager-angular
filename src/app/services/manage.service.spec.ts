import { TestBed } from '@angular/core/testing';

import { ManageService } from './manage.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { of } from 'rxjs';

describe('ManageService', () => {
  let service: ManageService;
  const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn(),
  };

  const MockFirestore = jest.fn(() => mockFirestore);

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [ ManageService, { provide: Firestore, useValue: mockFirestore } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    });
    service = TestBed.inject(ManageService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
