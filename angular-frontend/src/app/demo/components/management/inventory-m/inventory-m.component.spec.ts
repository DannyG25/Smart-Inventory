import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMComponent } from './inventory-m.component';

describe('InventoryMComponent', () => {
  let component: InventoryMComponent;
  let fixture: ComponentFixture<InventoryMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
