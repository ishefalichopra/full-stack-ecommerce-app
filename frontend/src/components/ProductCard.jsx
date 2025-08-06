import React from "react";
import "./ProductList.css";

const ProductCard = ({ product, onAddToCart, onDelete, isAdmin }) => {
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/300x200?text=No+Image-image.png";

  return (
    <div className="product-card">
      <img
        src={mainImage}
        alt={product.title}
        className="product-image"
      />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">₹{product.price}</p>
      <p className="product-description">{product.description}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart && onAddToCart(product)}
      >
        Add to Cart
      </button>

      {isAdmin && onDelete && (
        <button
          className="delete-btn"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      )}
      

    </div>
  );
};

export default ProductCard;
