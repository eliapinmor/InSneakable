import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { CatalogueSearch } from '../../components/catalogue-search/catalogue-search';
import { CatalogueFilters, FilterState } from '../../components/catalogue-filters/catalogue-filters'

@Component({
  selector: 'app-catalogue',
  imports: [ProductCard, CatalogueSearch, CatalogueFilters],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);

  allProducts = signal<any[]>([]);
  categories = signal<any[]>([]);

  searchQuery = signal<string>('');

  filters = signal<FilterState>({
    selectedCategory: '',
    selectedSort: '',
    maxPrice: 500,
  });

  products = computed(() => {
    const { selectedCategory, selectedSort, maxPrice } = this.filters();
    let result = this.allProducts();

    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category_id === selectedCategory);
    }

    result = result.filter(p => p.price <= maxPrice);

    if (selectedSort === 'price_asc')  result = [...result].sort((a, b) => a.price - b.price);
    if (selectedSort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
    if (selectedSort === 'name_asc')   result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (selectedSort === 'name_desc')  result = [...result].sort((a, b) => b.name.localeCompare(a.name));

    return result;
  });

  ngOnInit() {
    this.productsService.getProducts().subscribe((res: any) => {
      if (res?.data) this.allProducts.set(res.data);
    });

    this.categoriesService.getCategories().subscribe((res: any) => {
      const data = Array.isArray(res) ? res : res?.data ?? [];
      this.categories.set(data);
    });
  }

  onSearchChange(value: string) {
    this.searchQuery.set(value);
  }

  onFiltersChange(partial: Partial<FilterState>) {
    this.filters.update(f => ({ ...f, ...partial }));
  }

  onResetFilters() {
    this.searchQuery.set('');
    this.filters.set({ selectedCategory: '', selectedSort: '', maxPrice: 500 });
  }
}