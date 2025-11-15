import React, { useEffect, useState } from "react";
import type { Product } from "./types";
import { fetchProducts, createProduct } from "./api/products";
import ProductCard from "./components/ProductCard/ProductCard";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Отримуємо продукти
  const loadProducts = () => {
    fetchProducts().then(setProducts).catch(console.error);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Додавання нового продукту (для прикладу можна генерувати рандомний)
  const handleAddProduct = async () => {
    // Масив прикладів категорій та назв
    const categories = ["Sneakers", "Running", "Casual", "Formal"];
    const names = ["Nike", "Adidas", "Puma", "Reebok"];

    // Генеруємо новий продукт
    const newProduct = {
      name: names[Math.floor(Math.random() * names.length)],
      price: +(Math.random() * 200).toFixed(2), // випадкова ціна
      variants: ["S", "M", "L"].sort(() => 0.5 - Math.random()), // випадковий порядок
      description: "Randomly generated product",
      category: categories[Math.floor(Math.random() * categories.length)],
      inStock: Math.random() < 0.5, // true або false випадково
      currency: "USD", // завжди USD
      imageUrl: `https://picsum.photos/seed/${Math.floor(
        Math.random() * 1000
      )}/600/400`, // рандомне фото
    };

    try {
      await createProduct(newProduct);
      loadProducts(); // обновлюємо список після додавання
    } catch (err) {
      console.error(err);
    }
  };

  // Отримуємо унікальні категорії з продуктів
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Фільтруємо продукти по категорії
  const displayedProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ padding: "16px" }}>
      {/* Кнопка додати продукт */}
      <button
        onClick={handleAddProduct}
        style={{
          padding: "8px 16px",
          marginBottom: "16px",
          borderRadius: "6px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Product
      </button>

      {/* Кнопки категорій */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setSelectedCategory("All")}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: selectedCategory === "All" ? "#1d4ed8" : "#e5e7eb",
            color: selectedCategory === "All" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              backgroundColor: selectedCategory === cat ? "#1d4ed8" : "#e5e7eb",
              color: selectedCategory === cat ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сітка продуктів */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: "16px",
        }}
      >
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
