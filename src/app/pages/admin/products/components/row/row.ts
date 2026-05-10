import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'tr[app-product-row]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './row.html',
  styleUrl: './row.css',
})
export class Row {
  product = input<any>();

  edit = output<any>();
  delete = output<any>();
}
