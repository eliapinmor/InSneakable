import { Injectable, signal } from '@angular/core';
import { CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = signal<CartItem[]>(this.loadCart());

  addToCart(product: Product, size: string): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.subtotal = existingItem.quantity * existingItem.unit_price;
      this.cartItems.set([...currentItems]);
    } else {
      const newItem: CartItem = {
        product: product,
        size: size,
        quantity: 1,
        unit_price: product.price,
        subtotal: product.price,
      };
      this.cartItems.set([...currentItems, newItem]);
    }
    this.saveToLocalStorage();
  }

  public removeFromCart(productId: string, size: string): void {
    const updatedItems = this.cartItems().filter(
      (item) => !(item.product.id === productId && item.size === size)
    );
    this.cartItems.set(updatedItems);
    this.saveToLocalStorage();
  }

  public clearCart(): void {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
}