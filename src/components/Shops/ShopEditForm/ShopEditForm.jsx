import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import * as shopService from "../../../services/shopService.js";
import { getIndustries } from "../../../services/industryService.js";

import "./ShopEditForm.css";

const ShopEditForm = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [industries, setIndustries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    address1: "",
    region: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [shopData, fetchedIndustries] = await Promise.all([
          shopService.getShop(shopId),
          getIndustries(),
        ]);

        setIndustries(fetchedIndustries);
        setFormData({
          name: shopData.name || "",
          industry: shopData.industry?._id || shopData.industry || "",
          description: shopData.description || "",
          address1: shopData.address?.address1 || shopData.address1 || "",
          region: shopData.address?.region || shopData.region || "",
          postalCode: shopData.address?.postalCode || shopData.postalCode || "",
          country: shopData.address?.country || shopData.country || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialData();
  }, [shopId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formattedData = {
        name: formData.name,
        description: formData.description,
        industry: formData.industry,
        address: {
          address1: formData.address1,
          region: formData.region,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      };
      await shopService.updateShop(shopId, formattedData);
      navigate(`/shops/${shopId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="shop-form-container">
      <div className="shop-form-card">
        <header className="shop-form-header">
          <h1>Edit Shop</h1>
          <p>Modify your boutique settings</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Shop Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="industry">Industry</label>
            <select
              name="industry"
              id="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Industry --</option>
              {industries.map((industry) => (
                <option key={industry._id} value={industry._id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="address1">Street Address</label>
            <input
              type="text"
              name="address1"
              id="address1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="region">Region</label>
              <input
                type="text"
                name="region"
                id="region"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update Boutique
            </button>
            <Link to={`/shops/${shopId}`} className="cancel-btn">
              Discard Changes
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ShopEditForm;
