import React from "react";
import { Link } from "react-router";
import "./ShopCard.css";

const ShopCard = ({ shop }) => {
  const placeholderImage =
    "https://t4.ftcdn.net/jpg/06/57/37/01/240_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";

  return (
    <Link to={`/shops/${shop._id}`} className="card">
      <div className="shop-image-container">
        <img
          src={shop.image || placeholderImage}
          alt={shop.name}
          className="shop-image"
        />
      </div>
      <div className="shop-info">
        <h3 className="shop-name">{shop.name}</h3>
        <p>Industry: {shop.industry.name}</p>
        <p>{shop.description}</p>
      </div>
    </Link>
  );
};

export default ShopCard;
