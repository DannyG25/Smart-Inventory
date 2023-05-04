import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMComponent } from './category-m.component';

describe('CategoryMComponent', () => {
  let component: CategoryMComponent;
  let fixture: ComponentFixture<CategoryMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
