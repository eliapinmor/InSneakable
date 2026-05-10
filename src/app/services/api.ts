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

  getCategories() {
    return this.http.get(`${this.apiUrl}/api/categories`);
  }

  createProduct(formData: FormData) {
    return this.http.post(`${this.apiUrl}/api/products`, formData);
  }

  updateProduct(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/api/products/${id}`, payload);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
