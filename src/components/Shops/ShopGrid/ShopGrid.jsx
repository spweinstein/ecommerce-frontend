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
  }, [shops]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedIndustry(value);
  };

  return (
    <main className="shop-grid-container">
      <header className="grid-header">
        <h1>All Shops</h1>
        <Link to="/shops/new" className="create-shop-btn">
          ➕ Create New Shop
        </Link>
        <div>
          <label htmlFor="industry">Filter Industry</label>
          <select
            name="industry"
            id="industry"
            required
            onChange={handleChange}
          >
            <option value="">-- Select an option --</option>

            {industries.map((industry) => (
              <option key={industry._id} value={industry._id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>
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
