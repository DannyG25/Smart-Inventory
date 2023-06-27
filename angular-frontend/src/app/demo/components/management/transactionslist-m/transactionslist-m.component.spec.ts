import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionslistMComponent } from './transactionslist-m.component';

describe('TransactionslistMComponent', () => {
  let component: TransactionslistMComponent;
  let fixture: ComponentFixture<TransactionslistMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionslistMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionslistMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
