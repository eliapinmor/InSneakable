import { Component, inject, signal } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  private ordersService = inject(OrdersService);

  myOrders = signal<any[]>([]);
  ngOnInit() {
    this.loadOrders();
  }
  
  loadOrders() {
    this.ordersService.getMyOrders().subscribe({
      next: (res: any) => {
        this.myOrders.set(res);
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
      }
    });
  }
}
