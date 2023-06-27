import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiondetailMComponent } from './transactiondetail-m.component';

describe('TransactiondetailMComponent', () => {
  let component: TransactiondetailMComponent;
  let fixture: ComponentFixture<TransactiondetailMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactiondetailMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactiondetailMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
