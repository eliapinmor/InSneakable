import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilterState {
  selectedCategory: string;
  selectedSort: string;
  maxPrice: number;
}

@Component({
  selector: 'app-catalogue-filters',
  imports: [FormsModule],
  templateUrl: './catalogue-filters.html',
  styleUrl: './catalogue-filters.css',
})
export class CatalogueFilters {
  categories = input.required<any[]>();
  filters = input.required<FilterState>();
  filtersChange = output<Partial<FilterState>>();
  resetFilters = output<void>();

  readonly sortOptions = [
    { value: '',           label: 'Relevancia' },
    { value: 'price_asc',  label: 'Precio: menor a mayor' },
    { value: 'price_desc', label: 'Precio: mayor a menor' },
    { value: 'name_asc',   label: 'Nombre: A → Z' },
    { value: 'name_desc',  label: 'Nombre: Z → A' },
  ];

  get activeFilterCount(): number {
    const f = this.filters();
    let count = 0;
    if (f.selectedCategory) count++;
    if (f.selectedSort) count++;
    if (f.maxPrice < 500) count++;
    return count;
  }

  onCategoryChange(value: string) {
    this.filtersChange.emit({ selectedCategory: value });
  }

  onSortChange(value: string) {
    this.filtersChange.emit({ selectedSort: value });
  }

  onMaxPriceChange(value: number) {
    this.filtersChange.emit({ maxPrice: Number(value) });
  }

  onReset() {
    this.resetFilters.emit();
  }
}