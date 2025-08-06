import React from "react";
import ProductCard from "./productCard";
import "./ProductList.css";

const ProductList = ({ products, onAddToCart, onDelete, isAdmin }) => {
  return (
    <section className="product-list-section">
      <h2 className="product-list-title">Our Products</h2>
      {products.length === 0 ? (
        <p className="no-products">No products available</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
