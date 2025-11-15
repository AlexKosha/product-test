import React, { useState } from "react";
import type { Product } from "../../types";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] || ""
  );
  const [added, setAdded] = useState(false); // стан кнопки

  const handleAddToCart = () => {
    if (!added) {
      // Тут можна викликати функцію додавання у кошик / API
      console.log(`Added ${product.name} to cart`);
      setAdded(true); // змінюємо стан на "додано"
    }
  };

  return (
    <div className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>
          {product.price} {product.currency}
        </div>
        {product.variants.length > 0 && (
          <select
            className={styles.variant}
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            {product.variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}
        <button
          className={styles.button}
          onClick={handleAddToCart}
          disabled={!product.inStock || added} // блокуємо якщо товар не в наявності або вже додано
        >
          {added
            ? "Already Added"
            : product.inStock
            ? "Add to Cart"
            : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
