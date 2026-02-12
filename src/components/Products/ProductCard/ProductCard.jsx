import React from "react";
import { Link } from "react-router";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const placeholderImage =
    "https://t4.ftcdn.net/jpg/06/57/37/01/240_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={product.image || placeholderImage}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price?.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
