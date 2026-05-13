import { Injectable, signal } from '@angular/core';
import { CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = signal<CartItem[]>(this.loadCart());
 
  addToCart(product: Product, size: string, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(
      (item) => item.product.id === product.id && item.size === size
    );
 
    if (existingItem) {
      const newQty = existingItem.quantity + quantity;
      const capped = Math.min(newQty, product.stock); // no superar stock
      existingItem.quantity = capped;
      existingItem.subtotal = capped * existingItem.unit_price;
      this.cartItems.set([...currentItems]);
    } else {
      const cappedQty = Math.min(quantity, product.stock);
      const newItem: CartItem = {
        product,
        size,
        quantity: cappedQty,
        unit_price: product.price,
        subtotal: cappedQty * product.price,
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