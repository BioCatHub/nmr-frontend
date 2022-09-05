import { TestBed } from '@angular/core/testing';

import { ControlCommandsService } from './control-commands.service';

describe('ControlCommandsService', () => {
  let service: ControlCommandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlCommandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
