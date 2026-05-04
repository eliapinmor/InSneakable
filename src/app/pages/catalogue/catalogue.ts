import { Component, inject, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-catalogue',
  imports: [ProductCard],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit {
  products = signal<any[]>([]);
  private apiService = inject(Api);
  ngOnInit() {
    this.apiService.getProducts().subscribe((res: any) => {
      if (res && res.data) {
        this.products.set(res.data);
      }
    });
  }
}
