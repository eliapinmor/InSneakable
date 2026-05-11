import { Injectable, signal } from '@angular/core';
import { CartItem } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items = signal<CartItem[]>([]);

  addToCart(item: CartItem) {
    const currentItems = this.items();
    const existingItemIndex = currentItems.findIndex(
      (i) => i.productId === item.productId && i.size === item.size,
    );
  }

  //loadcart()

  
}
