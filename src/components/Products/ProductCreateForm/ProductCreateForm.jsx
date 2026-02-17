import { useState, useContext, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { getProductCategories } from "../../../services/productCategoryService.js";
import { useNavigate, useLocation, Link } from "react-router";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "../../../styles/forms.css";

const ProductCreateForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const shop = location?.state?.shop;

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
    shop,
    category: "",
  });

  useEffect(() => {
    if (shop?.industry?._id) {
      const fetchProductCategories = async (industryId) => {
        try {
          const fetchedProductCategories =
            await getProductCategories(industryId);
          setProductCategories(fetchedProductCategories);
        } catch (e) {
          console.log(e);
        }
      };
      fetchProductCategories(shop.industry._id);
    }
  }, [shop]);

  if (!shop) {
    return (
      <main className="form-container">
        <div className="form-card" style={{ textAlign: "center" }}>
          <h3>Must create a product from link on a shop's page</h3>
          <Link
            to="/"
            className="cancel-btn"
            style={{ display: "block", marginTop: "20px" }}
          >
            Return to homepage
          </Link>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="form-container">
        <div className="form-card">
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
      await productService.createProduct(formData);
      navigate(`/shops/${shop._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="form-container">
      <div className="form-card">
        <header className="form-header">
          <p>{shop.name}</p>
          <h1>New Product</h1>
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
                value={formData.productCategory}
              >
                <option value="">-- Select --</option>
                {productCategories.map((cat) => (
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

          <div className="form-row">
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
              Add Product
            </button>
            <Link to={`/shops/${shop._id}`} className="cancel-btn">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductCreateForm;
