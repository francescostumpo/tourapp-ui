import { TestBed } from '@angular/core/testing';

import { TicketStandardService } from './ticket-standard.service';

describe('TicketStandardService', () => {
  let service: TicketStandardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketStandardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
