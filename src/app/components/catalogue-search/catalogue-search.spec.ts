import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSearch } from './catalogue-search';

describe('CatalogueSearch', () => {
  let component: CatalogueSearch;
  let fixture: ComponentFixture<CatalogueSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
