import { Component, input, inject, signal, effect } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  private api = inject(Api);

  slug = input.required<string>();

  data = signal<any>(null);

  constructor() {
    effect(() => {
      this.api.getProductBySlug(this.slug()).subscribe({
        next: (res: any) => {
          this.data.set(res);
        },
        error: (err) => console.error('Error cargando producto', err)
      });
    });
  }
}
