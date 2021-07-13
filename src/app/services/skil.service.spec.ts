import { TestBed } from '@angular/core/testing';

import { SkilService } from './skil.service';

describe('SkilService', () => {
  let service: SkilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
