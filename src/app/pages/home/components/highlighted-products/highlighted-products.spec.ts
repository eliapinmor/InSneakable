import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedProducts } from './highlighted-products';

describe('HighlightedProducts', () => {
  let component: HighlightedProducts;
  let fixture: ComponentFixture<HighlightedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightedProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightedProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
