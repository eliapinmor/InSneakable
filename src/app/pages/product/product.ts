import { Component, input, inject, signal, effect } from '@angular/core';
import { SizeButton } from './components/size-button/size-button';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  imports: [SizeButton],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  private productsService = inject(ProductsService);

  slug = input.required<string>();

  data = signal<any>(null);

  constructor() {
    effect(() => {
      this.productsService.getProductBySlug(this.slug()).subscribe({
        next: (res: any) => {
          this.data.set(res);
        },
        error: (err) => console.error('Error cargando producto', err)
      });
    });
  }

  selectedSize = signal<string | null>(null);

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  //funcion de añadir al carrito
}
