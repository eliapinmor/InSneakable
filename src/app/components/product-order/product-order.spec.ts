import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrder } from './product-order';

describe('ProductOrder', () => {
  let component: ProductOrder;
  let fixture: ComponentFixture<ProductOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
