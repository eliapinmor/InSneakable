import { Component, input, inject, signal, effect } from '@angular/core';
import { SizeButton } from './components/size-button/size-button';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [SizeButton],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  slug = input.required<string>();

  data = signal<any>(null);
  selectedSize = signal<string | null>(null);

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


  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  handleAddToCart() {
    const size = this.selectedSize();
    const product = this.data();
    if (!size) {
      alert('Por favor, selecciona una talla');
      return;
    }

    if(product) {
      this.cartService.addToCart(product, size);
    }
  }

  //funcion de añadir al carrito
}
