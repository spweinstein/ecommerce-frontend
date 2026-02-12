import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as shopService from "../../../services/shopService";
import ShopCard from "../ShopCard/ShopCard.jsx";
import "./ShopGrid.css";

const ShopGrid = () => {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsData = await shopService.getShops();
        setShops(shopsData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className="shop-grid-container">
      <div className="shop-grid-header">
        <h3>Shops</h3>
        <Link to="/shops/new" className="new-shop-btn">
          New Shop
        </Link>
      </div>

      {shops.length > 0 ? (
        <div className="shop-grid">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="no-shops">No shops yet</div>
      )}
    </div>
  );
};

export default ShopGrid;
