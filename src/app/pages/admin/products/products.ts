import { Component, inject, signal } from '@angular/core';
import { ProductTable } from './components/product-table/product-table';
import { ProductSlideover } from '../../../components/product-slideover/product-slideover';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';

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

  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);

  ngOnInit() {
    this.productsService.getProducts().subscribe((res: any) => {
      if (res?.data) {
        this.products.set(res.data);
      }
    });
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories.set(res);
    });
  }
  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (res: any) => {
        if (res?.data) this.products.set(res.data);
        else if (Array.isArray(res)) this.products.set(res);
      },
      error: (err) => console.error('Error cargando productos', err),
    });

    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
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

// En products.ts

confirmDelete(product: any) {
  // 1. Pedimos confirmación al usuario
  const ok = confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`);
  
  if (ok) {
    // 2. Llamamos al servicio usando el ID (UUID)
    this.productsService.deleteProduct(product.id).subscribe({
      next: () => {
        // 3. Si sale bien, mostramos aviso y refrescamos la lista
        alert('Producto eliminado correctamente');
        this.loadProducts(); 
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Hubo un error al intentar eliminar el producto.');
      }
    });
  }
}
}
