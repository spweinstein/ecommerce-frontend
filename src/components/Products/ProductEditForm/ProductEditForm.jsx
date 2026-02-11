import { useState, useContext, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import * as shopService from "../../../services/shopService.js";

import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";

const ProductEditForm = () => {
  const [shop, setShop] = useState({});
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
  });

  const { productId } = useParams();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProduct(productId);
        setFormData({
          name: fetchedProduct.name,
          description: fetchedProduct.description,
          price: fetchedProduct.price,
          brand: fetchedProduct.brand,
          sku: fetchedProduct.sku,
          imgURL: fetchedProduct.imgURL || "",
          weight: fetchedProduct.weight || 0,
          length: fetchedProduct.length || 0,
          width: fetchedProduct.width || 0,
          height: fetchedProduct.height || 0,
        });
        setShop(fetchedProduct.shop);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

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
      const createdProduct = await productService.updateProduct(
        productId,
        formData,
      );
      navigate(`/products/${productId}`);



      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>{shop.name}</h2>
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

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
};

export default ProductEditForm;
