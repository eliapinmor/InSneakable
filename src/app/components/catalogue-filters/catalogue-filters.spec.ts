import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueFilters } from './catalogue-filters';

describe('CatalogueFilters', () => {
  let component: CatalogueFilters;
  let fixture: ComponentFixture<CatalogueFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
