import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTipologyComponent } from './ticket-tipology.component';

describe('TicketTipologyComponent', () => {
  let component: TicketTipologyComponent;
  let fixture: ComponentFixture<TicketTipologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTipologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTipologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
