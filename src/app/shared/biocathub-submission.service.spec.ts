import { TestBed } from '@angular/core/testing';

import { BiocathubSubmissionService } from './biocathub-submission.service';

describe('BiocathubSubmissionService', () => {
  let service: BiocathubSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiocathubSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
