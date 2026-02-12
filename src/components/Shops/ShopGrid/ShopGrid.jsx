import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as shopService from "../../../services/shopService";
import "./ShopGrid.css";

const ShopGrid = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopData = await shopService.getShops();
        setShops(shopData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShops();
  }, []);

  return (
    <main className="shop-grid-container">
      <header className="grid-header">
        <h1>All Shops</h1>
        <Link to="/shops/new" className="create-shop-btn">
          ➕ Create New Shop
        </Link>
      </header>

      <div className="shop-grid">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <Link
              to={`/shops/${shop._id}`}
              key={shop._id}
              className="shop-card"
            >
              <h3>{shop.name}</h3>
              <p>{shop.description.substring(0, 60)}...</p>
              <span className="view-details">View Shop →</span>
            </Link>
          ))
        ) : (
          <p>No shops found. Start by creating one!</p>
        )}
      </div>
    </main>
  );
};

export default ShopGrid;
