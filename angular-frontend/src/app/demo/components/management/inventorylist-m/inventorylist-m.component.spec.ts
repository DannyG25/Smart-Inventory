import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorylistMComponent } from './inventorylist-m.component';

describe('InventorylistMComponent', () => {
  let component: InventorylistMComponent;
  let fixture: ComponentFixture<InventorylistMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorylistMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorylistMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
