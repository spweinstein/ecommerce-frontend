import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import * as shopService from "../../../services/shopService.js";
import { getIndustries } from "../../../services/industryService.js";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./ShopCreateForm.css";

const ShopCreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    address1: "",
    region: "",
    postalCode: "",
    country: "",
  });
  const [industries, setIndustries] = useState([]);
  const { user } = useContext(UserContext);

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

  if (!user) {
    return (
      <main className="shop-form-container">
        <div className="shop-form-card">
          <p>Please sign in to access this page.</p>
          <Link
            to="/sign-in"
            className="submit-btn"
            style={{
              textDecoration: "none",
              textAlign: "center",
              display: "block",
              marginTop: "20px",
            }}
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

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
      await shopService.createShop(formattedData);
      navigate("/shops");
    } catch (err) {
      console.error("Backend Error Object:", err.response?.data);
    }
  };

  return (
    <main className="shop-form-container">
      <div className="shop-form-card">
        <header className="shop-form-header">
          <h1>Create Shop</h1>
          <p>Establish your digital boutique</p>
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
              placeholder="Enter shop name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="industry">Industry</label>
            <select
              name="industry"
              id="industry"
              value={formData.industry}
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

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your shop"
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
              placeholder="123 Shopping St"
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
                placeholder="Region/State"
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
                placeholder="Zip Code"
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
              placeholder="Country"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Create Shop
            </button>
            <Link
              to="/shops"
              className="cancel-btn"
              style={{ textAlign: "center", textDecoration: "none" }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ShopCreateForm;
