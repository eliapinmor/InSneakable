import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProductBySlug(slug: string) {
    return this.http.get(`${this.apiUrl}/${slug}`);
  }

  createProduct(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  updateProduct(id: string, formData: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
