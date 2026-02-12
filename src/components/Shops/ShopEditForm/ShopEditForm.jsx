import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as shopService from "../../../services/shopService";
import { getIndustries } from "../../../services/industryService";

const ShopEditForm = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
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

  useEffect(() => {
    const fetchShop = async () => {
      const shopData = await shopService.getShop(shopId);
      // This populates the form with existing data or empty strings if missing
      setFormData({
        name: shopData.name || "",
        industry: shopData.industry._id,
        description: shopData.description || "",
        address1: shopData.address?.address1 || shopData.address1 || "",
        region: shopData.address?.region || shopData.region || "",
        postalCode: shopData.address?.postalCode || shopData.postalCode || "",
        country: shopData.address?.country || shopData.country || "",
      });
    };
    fetchShop();
  }, [shopId]);

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
    <main>
      <h1>Edit Shop</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
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
            value={formData.industry}
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
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address1">Street</label>
          <input
            type="text"
            name="address1"
            id="address1"
            value={formData.address1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="region">Region</label>
          <input
            type="text"
            name="region"
            id="region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Shop</button>
      </form>
    </main>
  );
};

export default ShopEditForm;
