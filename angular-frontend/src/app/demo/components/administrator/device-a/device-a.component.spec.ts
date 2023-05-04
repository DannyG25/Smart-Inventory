import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAComponent } from './device-a.component';

describe('DeviceAComponent', () => {
  let component: DeviceAComponent;
  let fixture: ComponentFixture<DeviceAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
