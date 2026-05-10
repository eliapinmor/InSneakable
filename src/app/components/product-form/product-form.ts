import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  product = input<any>(null);
  mode = input<'create' | 'edit'>('edit');
  previewImages = signal<string[]>([]);
  save = output<any>();
  categories = input<any[]>([]);
  selectedFile: File | null = null;

  originalSizes: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      category_id: [null, Validators.required],
      description: [''],
      stock: [0, Validators.required],
      brand: ['', Validators.required],
      sizes: [''],
      file: [null],
    });

    effect(() => {
      const p = this.product();
      if (p) {
        const sizesStr = Array.isArray(p.sizes) ? p.sizes.join(',') : (p.sizes ?? '');
        this.originalSizes = sizesStr;
        this.form.patchValue({
          name: p.name ?? '',
          price: p.price ?? 0,
          category_id: p.category_id ?? null,
          description: p.description ?? '',
          stock: p.stock ?? 0,
          brand: p.brand ?? '',
          sizes: sizesStr,
        });

        if (p.image_url) {
          this.previewImages.set([p.image_url]);
        } else {
          this.previewImages.set([]);
        }
      } else {
        // crear: limpiar
        this.form.reset({
          name: '',
          price: 0,
          category_id: null,
          description: '',
          stock: 0,
          brand: '',
          sizes: '',
        });
        this.previewImages.set([]);
        this.selectedFile = null;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.value;
    const formData = new FormData();

    // 1. Campos obligatorios como strings
    formData.append('name', raw.name);
    formData.append('description', raw.description || '');
    formData.append('brand', raw.brand || '');
    formData.append('category_id', raw.category_id);
    formData.append('price', String(raw.price));
    formData.append('stock', String(raw.stock));

    // 2. EL CAMBIO CLAVE PARA EL ERROR DE COALESCE:
    // Enviamos siempre is_active como string 'true'
    formData.append('is_active', 'true');

    // 3. LAS TALLAS:
    // El backend hace JSON.parse(), así que DEBE ser un string JSON ["a","b"]
    const sizesValue = raw.sizes ? String(raw.sizes).trim() : '';
    let sizesArray: string[] = [];

    if (sizesValue) {
      sizesArray = sizesValue
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Enviamos el string JSON. Ejemplo: '["38","40"]'
    formData.append('sizes', JSON.stringify(sizesArray));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.save.emit(formData);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    // preview
    const reader = new FileReader();
    reader.onload = () => this.previewImages.set([reader.result as string]);
    reader.readAsDataURL(file);
  }
}
