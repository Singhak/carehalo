import { TestBed } from '@angular/core/testing';

import { PatientsService } from './patient.service';

describe('Patients', () => {
  let service: PatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
