import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SitoComponent} from './sito.component';

describe('SitoComponent', () => {
  let component: SitoComponent;
  let fixture: ComponentFixture<SitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SitoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
