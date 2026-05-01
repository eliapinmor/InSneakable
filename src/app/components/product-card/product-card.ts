import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
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
