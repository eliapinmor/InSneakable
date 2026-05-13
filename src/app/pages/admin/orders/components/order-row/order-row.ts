import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr[app-order-row]', // Esto es clave para que no se descuadre
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-row.html',
})
export class OrderRow {
  order = input.required<any>();
  statusOptions = input.required<string[]>();
  
  statusChange = output<{ orderId: string; status: string }>();
  toggle = output<void>();

  onToggle() {
    this.toggle.emit();
  }

  onStatusChange(orderId: string, status: string): void {
    this.statusChange.emit({ orderId, status });
  }
}