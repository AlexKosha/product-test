export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  variants: string[];
  inStock: boolean;
  description: string;
  category: string;
}
