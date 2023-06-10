import { TestBed } from '@angular/core/testing';

import { ManageService } from './manage.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';

describe('ManageService', () => {
  let service: ManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [ ManageService ]
    });
    service = TestBed.inject(ManageService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
