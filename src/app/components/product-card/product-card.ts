import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  data = input.required<any>(); 
  
  // URL base de tu backend Express
  private baseUrl = 'http://localhost:3000/';

  get imageUrl() {
    return `${this.baseUrl}${this.data().image_url}`;
  }
}
