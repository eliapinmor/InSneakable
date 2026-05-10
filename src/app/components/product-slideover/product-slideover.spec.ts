import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSlideover } from './product-slideover';

describe('ProductSlideover', () => {
  let component: ProductSlideover;
  let fixture: ComponentFixture<ProductSlideover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSlideover],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSlideover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
