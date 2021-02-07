import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PiedigrottaChurchComponent} from './piedigrotta-church.component';

describe('PiedigrottaChurchComponent', () => {
  let component: PiedigrottaChurchComponent;
  let fixture: ComponentFixture<PiedigrottaChurchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiedigrottaChurchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiedigrottaChurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
