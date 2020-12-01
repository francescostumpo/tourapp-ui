import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStandardComponent } from './ticket-standard.component';

describe('TicketStandardComponent', () => {
  let component: TicketStandardComponent;
  let fixture: ComponentFixture<TicketStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
