import { TestBed } from '@angular/core/testing';

import { WorkLeaveService } from './work-leave.service';

describe('WorkLeaveService', () => {
  let service: WorkLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
