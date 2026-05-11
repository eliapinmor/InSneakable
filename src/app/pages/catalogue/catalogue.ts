import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-catalogue',
  imports: [ProductCard],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit {
  products = signal<any[]>([]);
  private productsService = inject(ProductsService);
  ngOnInit() {
    this.productsService.getProducts().subscribe((res: any) => {
      if (res && res.data) {
        this.products.set(res.data);
      }
    });
  }
}
