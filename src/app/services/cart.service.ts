import { Injectable, signal } from '@angular/core';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = signal<CartItem[]>([]);

  private cartItems = signal<CartItem[]>(this.loadCart());

  addToCart(product: any, size: string) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(
      (item) => item.productId === product.id && item.size === size,
    );

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.set([...currentItems]);
    } else {
      // Si es nuevo, lo añadimos
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        images: product.images[0],
        size: size,
        quantity: 1,
      };
      this.cartItems.set([...currentItems, newItem]);
    }
    this.saveToLocalStorage();
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private removeFromCart(productId: string, size: string) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(
      (item) => !(item.productId === productId && item.size === size),
    );
    this.cartItems.set(updatedItems);
    this.saveToLocalStorage();
  }

  private clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }
}
