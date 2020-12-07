import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzoTownComponent } from './pizzo-town.component';

describe('PizzoTownComponent', () => {
  let component: PizzoTownComponent;
  let fixture: ComponentFixture<PizzoTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzoTownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzoTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
