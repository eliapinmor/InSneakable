import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  public cartService = inject(CartService);
  private ordersService = inject(OrdersService);
  private router = inject(Router);

  get total(): number {
    return this.cartService.cartItems().reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
  }

  checkout(): void {
    const itemsMapped = this.cartService.cartItems().map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
      size: item.size,
      unit_price: item.unit_price,
    }));

    const orderData = {
      items: itemsMapped,
    };

    this.ordersService.newOrder(orderData).subscribe({
      next: () => {
        alert('¡Pedido realizado con éxito!');
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Error completo del servidor:', err);
        const msg = err.error?.error || 'Error al procesar el pedido';
        alert(msg);
      }
    });
  }
}