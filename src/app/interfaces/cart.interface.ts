import { Product } from "./product.interface";
// ------------------------------------------------------------
// CartItem
// Producto añadido al carrito con talla y cantidad seleccionadas
// ------------------------------------------------------------
export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}