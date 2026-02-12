import { useState, useContext, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { getProductCategories } from "../../../services/productCategoryService.js";
import { useNavigate, useParams, Link } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./ProductEditForm.css";

const ProductEditForm = () => {
  const [shop, setShop] = useState({});
  const [productCategories, setProductCategories] = useState([]);
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
    category: "",
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
          category: fetchedProduct.category?._id || fetchedProduct.category,
        });
        setShop(fetchedProduct.shop);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!shop?.industry) return;
    const fetchProductCategories = async (industryId) => {
      try {
        const fetchedProductCategories = await getProductCategories(industryId);
        setProductCategories(fetchedProductCategories);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductCategories(shop.industry);
  }, [shop]);

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
      await productService.updateProduct(productId, formData);
      navigate(`/products/${productId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="product-form-container">
      <div className="product-form-card">
        <header className="product-form-header">
          <p>{shop?.name}</p>
          <h1>Edit Product</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                required
                onChange={handleChange}
                value={formData.category}
              >
                <option value="">-- Select --</option>
                {productCategories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
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
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
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
            <div className="input-group">
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
          </div>

          <div className="input-group">
            <label htmlFor="imgURL">Image URL</label>
            <input
              type="text"
              id="imgURL"
              name="imgURL"
              value={formData.imgURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-four">
            <div className="input-group">
              <label>Weight</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Length</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Width</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Height</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
            <Link to={`/products/${productId}`} className="cancel-btn">
              Discard Changes
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductEditForm;
