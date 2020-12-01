import { TestBed } from '@angular/core/testing';

import { SitoService } from './sito.service';

describe('SitoService', () => {
  let service: SitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
