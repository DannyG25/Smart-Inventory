import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorydetailMComponent } from './inventorydetail-m.component';

describe('InventorydetailMComponent', () => {
  let component: InventorydetailMComponent;
  let fixture: ComponentFixture<InventorydetailMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorydetailMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorydetailMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
