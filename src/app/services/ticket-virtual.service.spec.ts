import { TestBed } from '@angular/core/testing';

import { TicketVirtualService } from './ticket-virtual.service';

describe('TicketVirtualService', () => {
  let service: TicketVirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketVirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
