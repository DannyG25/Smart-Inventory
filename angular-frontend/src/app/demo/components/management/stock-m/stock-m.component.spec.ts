import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMComponent } from './stock-m.component';

describe('StockMComponent', () => {
  let component: StockMComponent;
  let fixture: ComponentFixture<StockMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
