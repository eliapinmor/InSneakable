export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  description: string;
  stock: number;
  brand: string;
  sizes: string[];
  images: string[];
  slug: string;
  is_active: boolean;
  created_at: string;
  categories?: Category;
}

export interface ProductResponse {
  data: Product[];
  count: number;
}