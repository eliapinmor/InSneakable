export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}
 
export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  brand: string | null;
  sizes: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
 

export interface ProductResponse extends Product {
  category: Category | null;
}