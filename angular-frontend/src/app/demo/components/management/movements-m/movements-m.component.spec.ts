import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsMComponent } from './movements-m.component';

describe('MovementsMComponent', () => {
  let component: MovementsMComponent;
  let fixture: ComponentFixture<MovementsMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementsMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
