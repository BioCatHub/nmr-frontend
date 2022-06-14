import { TestBed } from '@angular/core/testing';

import { OtInterfaceService } from './ot-interface.service';

describe('OtInterfaceService', () => {
  let service: OtInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
