import { Component, inject, signal } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderRow } from './components/order-row/order-row';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [DatePipe, FormsModule, TitleCasePipe, OrderRow],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders = signal<any[]>([]);

  private ordersService = inject(OrdersService);
  statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders.set(res);
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
      }
    });
  }

  //cambiar el estado
  changeStatus(id: string, event: any){
    console.log('cambiar estado jeje')
    this.ordersService.updateStatus(id, event).subscribe()
  }
}
