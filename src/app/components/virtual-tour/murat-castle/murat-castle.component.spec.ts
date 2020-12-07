import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuratCastleComponent } from './murat-castle.component';

describe('MuratCastleComponent', () => {
  let component: MuratCastleComponent;
  let fixture: ComponentFixture<MuratCastleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuratCastleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuratCastleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
