import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as shopService from "../../../services/shopService";

const ShopCreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address1: "",
    region: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      console.log("Attempting to send:", formData);

      const formattedData = {
        name: formData.name,
        description: formData.description,
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
      alert(
        "Validation Error: " + (err.response?.data?.message || "Check fields"),
      );
    }
  };

  return (
    <main>
      <h1>Create Shop</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Shop Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="address1">Street:</label>
        <input
          type="text"
          name="address1"
          id="address1"
          value={formData.address1}
          onChange={handleChange}
          required
        />

        <label htmlFor="region">Region:</label>
        <input
          type="text"
          name="region"
          id="region"
          value={formData.region}
          onChange={handleChange}
          required
        />

        <label htmlFor="postalCode">Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Shop</button>
      </form>
    </main>
  );
};

export default ShopCreateForm;
