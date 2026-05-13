import { Component, input, inject, signal, effect } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SizeButton } from './components/size-button/size-button';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [SizeButton, DecimalPipe],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  slug = input.required<string>();

  data = signal<any>(null);
  selectedSize = signal<string | null>(null);
  quantity = signal<number>(1);
  submitAttempted = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.productsService.getProductBySlug(this.slug()).subscribe({
        next: (res: any) => this.data.set(res),
        error: (err) => console.error('Error cargando producto', err),
      });
    });
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  increaseQuantity() {
    const stock = this.data()?.stock ?? 99;
    if (this.quantity() < stock) {
      this.quantity.update(q => q + 1);
    }
  }

  handleAddToCart() {
    const size = this.selectedSize();
    const product = this.data();

    this.submitAttempted.set(true);

    if (!size) return;
    if (!product) return;

    this.cartService.addToCart(product, size, this.quantity());

    this.quantity.set(1);
    this.selectedSize.set(null);
    this.submitAttempted.set(false);
  }
}