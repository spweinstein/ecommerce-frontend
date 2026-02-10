import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as shopService from "../../../services/shopService";

const ShopEditForm = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address1: "",
    region: "",
    country: "",
  });

  useEffect(() => {
    const fetchShop = async () => {
      const shopData = await shopService.getShop(shopId);
      // This populates the form with existing data or empty strings if missing
      setFormData({
        name: shopData.name || "",
        description: shopData.description || "",
        address1: shopData.address?.address1 || shopData.address1 || "",
        region: shopData.address?.region || shopData.region || "",
        country: shopData.address?.country || shopData.country || "",
      });
    };
    fetchShop();
  }, [shopId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await shopService.updateShop(shopId, formData);
      navigate(`/shops/${shopId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Edit Shop</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="address1">Street</label>
        <input
          type="text"
          name="address1"
          id="address1"
          value={formData.address1}
          onChange={handleChange}
        />

        <label htmlFor="region">Region</label>
        <input
          type="text"
          name="region"
          id="region"
          value={formData.region}
          onChange={handleChange}
        />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
        />

        <button type="submit">Update Shop</button>
      </form>
    </main>
  );
};

export default ShopEditForm;
