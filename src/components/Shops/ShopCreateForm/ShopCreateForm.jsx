import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import * as shopService from "../../../services/shopService.js";
import { getIndustries } from "../../../services/industryService.js";
import { UserContext } from "../../../contexts/UserContext.jsx";

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
      <main>
        <p>Please sign in to access this page.</p>
        <Link to="/sign-in">Sign In</Link>
      </main>
    );
  }

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // console.log("Attempting to send:", formData);

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
      // alert(
      //   "Validation Error: " + (err.response?.data?.message || "Check fields"),
      // );
    }
  };

  return (
    <main>
      <h1>Create Shop</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Shop Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">Industry</label>
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
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address1">Street:</label>
          <input
            type="text"
            name="address1"
            id="address1"
            value={formData.address1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            name="region"
            id="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Shop</button>
      </form>
    </main>
  );
};

export default ShopCreateForm;
