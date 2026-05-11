import { Component, input, output, inject } from '@angular/core';
import { ProductForm } from '../product-form/product-form';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-slideover',
  standalone: true,
  imports: [ProductForm, CommonModule],
  templateUrl: './product-slideover.html',
  styleUrl: './product-slideover.css',
})
export class ProductSlideover {
  open = input<boolean>(false);
  product = input<any>(null);
  mode = input<'create' | 'edit'>('edit');
  categories = input<any[]>([]);

  close = output<void>();
  refresh = output<void>();

  private productsService = inject(ProductsService);

  handleSubmit(formData: any) {
    console.log('Producto guardado en el slideover:', formData);
    // en handleSubmit antes de enviar
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    if (this.mode() === 'create') {
      this.productsService.createProduct(formData).subscribe(() => {
        this.close.emit();
        this.refresh.emit();
      });
    } else {
      this.productsService.updateProduct(this.product().id, formData).subscribe(() => {
        this.close.emit();
        this.refresh.emit();
      });
    }
  }
}
