import { useState, useContext } from "react";
import * as productService from "../../../services/productService.js";
import * as shopService from "../../../services/shopService.js";

import { useNavigate, useLocation } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";

const ProductCreateForm = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const shop = location?.state?.shop;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    sku: "",
    imgURL: "",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    shop: shop._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const createdProduct = await productService.createProduct(formData);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>{location.state?.shop.name}</h2>
      <h3>New Product</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imgURL">Image URL</label>
          <input
            type="text"
            id="imgURL"
            name="imgURL"
            value={formData.imgURL}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="length">Length</label>
          <input
            type="number"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="width">Width</label>
          <input
            type="number"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <input type="hidden" name="shop" id="shop" value={shop._id}></input>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
