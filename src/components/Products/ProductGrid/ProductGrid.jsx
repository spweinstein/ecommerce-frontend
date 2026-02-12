import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { Link } from "react-router";
import ProductCard from "../ProductCard/ProductCard.jsx";
import "./ProductGrid.css";
import { getIndustries } from "../../../services/industryService";
import { getProductCategories } from "../../../services/productCategoryService.js";

const ProductGrid = ({ shop, user }) => {
  const [products, setProducts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(
    shop && shop?.industry ? shop.industry._id : "",
  );
  const [productCategories, setProductCategories] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getProducts(
          shop?._id,
          selectedProductCategory,
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [shop, selectedProductCategory]);

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

  useEffect(() => {
    if (!selectedIndustry) {
      setProductCategories([]);
      return;
    }
    const fetchProductCategories = async (industryId) => {
      try {
        const fetchedProductCategories = await getProductCategories(industryId);
        setProductCategories(fetchedProductCategories);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProductCategories(selectedIndustry);
  }, [selectedIndustry]);

  const handleIndustryChange = (e) => {
    const { value } = e.target;
    setSelectedIndustry(value);
  };

  const handleProductCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedProductCategory(value);
  };

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h3>Products</h3>
        {shop && user && shop.user === user._id && (
          <Link to="/products/new" state={{ shop }} className="new-product-btn">
            New Product
          </Link>
        )}

        {/* If loading this from a shop page, don't include industry filter - already set */}
        {shop && shop?.industry ? (
          ""
        ) : (
          <div>
            <label htmlFor="industry">Filter Industry</label>
            <select
              name="industry"
              id="industry"
              required
              onChange={handleIndustryChange}
            >
              <option value="">-- Select an option --</option>

              {industries.map((industry) => (
                <option key={industry._id} value={industry._id}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="category">Product Category</label>
          <select
            name="category"
            id="category"
            required
            onChange={handleProductCategoryChange}
          >
            <option value="">-- Select an option --</option>

            {productCategories.map((productCategory) => (
              <option key={productCategory._id} value={productCategory._id}>
                {productCategory.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">No products yet</div>
      )}
    </div>
  );
};

export default ProductGrid;
