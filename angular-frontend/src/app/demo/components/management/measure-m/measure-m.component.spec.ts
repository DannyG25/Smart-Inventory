import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureMComponent } from './measure-m.component';

describe('MeasureMComponent', () => {
  let component: MeasureMComponent;
  let fixture: ComponentFixture<MeasureMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
