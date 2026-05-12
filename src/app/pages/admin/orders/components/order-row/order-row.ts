import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-row',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-row.html',
  styleUrl: './order-row.css',
})
export class OrderRow {
  order = input.required<any>();
  statusOptions = input.required<string[]>();
  statusChange = output<{ orderId: string; status: string }>();

  isExpanded = false;

  toggleItems(): void {
    this.isExpanded = !this.isExpanded;
  }

  onStatusChange(orderId: string, status: string): void {
    this.statusChange.emit({ orderId, status });
  }
}
