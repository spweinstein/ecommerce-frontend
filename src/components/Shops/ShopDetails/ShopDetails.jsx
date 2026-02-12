import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopService from "../../../services/shopService";

import ProductGrid from "../../Products/ProductGrid/ProductGrid.jsx";
import "./ShopDetails.css";

const ShopDetails = ({ user }) => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shopData = await shopService.getShop(shopId);
        setShop(shopData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShop();
  }, [shopId]);

  const handleDelete = async () => {
    try {
      await shopService.deleteShop(shopId);
      navigate("/shops");
    } catch (err) {
      console.error(err);
    }
  };

  if (!shop)
    return (
      <main className="shop-details-page">
        <p>Loading...</p>
      </main>
    );

  const isOwner = shop.user === user?._id || shop.user?._id === user?._id;

  return (
    <main className="shop-details-page">
      <div className="shop-header-card">
        <div className="shop-info">
          <h1>{shop.name}</h1>

          <div className="shop-details-box">
            <p className="shop-desc">{shop.description}</p>
            <p className="detail-line">
              <b>Industry</b> {shop.industry?.name || "N/A"}
            </p>
            <div className="location-chip">
              📍 {shop.address?.address1 || shop.address1 || "N/A"},{" "}
              {shop.address?.region || shop.region || "N/A"}
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="shop-actions">
            <Link to={`/shops/${shopId}/edit`} className="edit-link">
              Edit Shop
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="shop-content-section">
        <ProductGrid shop={shop} user={user} />
      </div>

      <div className="footer-nav">
        <Link to="/shops" className="back-link">
          ← Back to all shops
        </Link>
      </div>
    </main>
  );
};

export default ShopDetails;
