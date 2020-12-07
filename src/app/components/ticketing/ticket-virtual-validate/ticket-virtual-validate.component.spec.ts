import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketVirtualValidateComponent } from './ticket-virtual-validate.component';

describe('TicketVirtualValidateComponent', () => {
  let component: TicketVirtualValidateComponent;
  let fixture: ComponentFixture<TicketVirtualValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketVirtualValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketVirtualValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
