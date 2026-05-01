import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getProducts() {
    return this.http.get(`${this.apiUrl}/api/products`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/api/products/${id}`);
  }

  getProductBySlug(slug: string) {
    return this.http.get(`${this.apiUrl}/api/products/${slug}`);
  }

}
