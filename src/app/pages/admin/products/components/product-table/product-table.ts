import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Row } from '../row/row';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [Row, CommonModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
})
export class ProductTable {
  products = input<any[]>([]);

  edit = output<any>();
  delete = output<any>();

  onEdit(product: any) {
    console.log('Editar producto:', product);
    this.edit.emit(product);
  }

  onDelete(product: any) {
    this.delete.emit(product);
  }
}
