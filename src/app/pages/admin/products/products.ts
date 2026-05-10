import { Component, inject, signal } from '@angular/core';
import { Api } from '../../../services/api';
import { ProductTable } from './components/product-table/product-table';
import { ProductSlideover } from '../../../components/product-slideover/product-slideover';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductTable, ProductSlideover],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products = signal<any[]>([]);
  selectedProduct = signal<any>(null);
  isSlideoverOpen = signal(false);
  slideoverMode = signal<'create' | 'edit'>('edit');
  categories = signal<any[]>([]);

  private apiService = inject(Api);
  ngOnInit() {
    this.apiService.getProducts().subscribe((res: any) => {
      if (res?.data) {
        this.products.set(res.data);
      }
    });
    this.apiService.getCategories().subscribe((res: any) => {
      this.categories.set(res);
    });
  }
  loadProducts() {
    // Cargar productos
    this.apiService.getProducts().subscribe({
      next: (res: any) => {
        if (res?.data) this.products.set(res.data);
        else if (Array.isArray(res)) this.products.set(res);
      },
      error: (err) => console.error('Error cargando productos', err),
    });

    // Cargar categorías
    this.apiService.getCategories().subscribe({
      next: (res: any) => {
        // tu backend devuelve array directamente
        this.categories.set(Array.isArray(res) ? res : (res?.data ?? []));
      },
      error: (err) => console.error('Error cargando categorías', err),
    });
  }

  openEditSlideover(product: any) {
    this.selectedProduct.set(product);
    this.isSlideoverOpen.set(true);
    this.slideoverMode.set('edit');
  }

  openCreateSlideover() {
    this.selectedProduct.set(null);
    this.isSlideoverOpen.set(true);
    this.slideoverMode.set('create');
  }

  confirmDelete(product: any) {
    console.log('Eliminar producto:', product);
    // aquí luego añadimos el modal de confirmación
  }
}
