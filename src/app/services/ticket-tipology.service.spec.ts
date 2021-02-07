import {TestBed} from '@angular/core/testing';

import {TicketTipologyService} from './ticket-tipology.service';

describe('TicketTipologyService', () => {
  let service: TicketTipologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketTipologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
