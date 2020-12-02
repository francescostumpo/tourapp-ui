import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStandardValidateComponent } from './ticket-standard-validate.component';

describe('TicketStandardValidateComponent', () => {
  let component: TicketStandardValidateComponent;
  let fixture: ComponentFixture<TicketStandardValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStandardValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStandardValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
