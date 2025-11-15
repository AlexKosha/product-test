import type { Product } from "../types";

const BASE_URL = "https://product-api-df2r.onrender.com/products";

// Отримати всі продукти
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data: Product[] = await res.json();
  console.log(data);
  return data;
};

// Отримати продукт за ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const data: Product = await res.json();
  return data;
};

// Отримати продукти за категорією
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products by category");
  }
  const data: Product[] = await res.json();
  return data;
};

// Додати новий продукт
export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  const data: Product = await res.json();
  return data;
};
