import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as shopService from "../../../services/shopService";
import "./ShopGrid.css";
import { getIndustries } from "../../../services/industryService";

const ShopGrid = () => {
  const [shops, setShops] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopData = await shopService.getShops(selectedIndustry);
        setShops(shopData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShops();
  }, [selectedIndustry]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const fetchedIndustries = await getIndustries();
        setIndustries(fetchedIndustries);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIndustries();
  }, []);

  const handleChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  return (
    <main className="grid-container">
      <header className="grid-header">
        <div className="header-text">
          <h1>ALL SHOPS</h1>
          <p>CURATED SELECTION</p>
        </div>

        <div className="filter-box">
          <label htmlFor="industry">Industry</label>
          <select
            name="industry"
            id="industry"
            onChange={handleChange}
            value={selectedIndustry}
          >
            <option value="">ALL INDUSTRIES</option>
            {industries.map((industry) => (
              <option key={industry._id} value={industry._id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        <Link to="/shops/new" className="create-shop-box">
          <span className="plus-icon">+</span>
          <span className="create-text">CREATE NEW SHOP</span>
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
              <h2>{shop.name}</h2>
              <p>{shop.description?.substring(0, 60)}...</p>
              <span className="view-shop-btn">VIEW SHOP</span>
            </Link>
          ))
        ) : (
          <p className="no-shops">No shops found. Start by creating one!</p>
        )}
      </div>
    </main>
  );
};

export default ShopGrid;
