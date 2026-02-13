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
    shop?.industry?._id || "",
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
        setProducts(fetchedProducts || []);
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
    setSelectedIndustry(e.target.value);
  };

  const handleProductCategoryChange = (e) => {
    setSelectedProductCategory(e.target.value);
  };

  return (
    <div className="grid-container">
      <div className="grid-header">
        <h3>Products</h3>

        <div className="filter-group">
          {!shop && (
            <div className="filter-box">
              <label htmlFor="industry">Industry</label>
              <select
                id="industry"
                onChange={handleIndustryChange}
                value={selectedIndustry}
              >
                <option value="">ALL INDUSTRIES</option>
                {industries.map((industry) => (
                  <option key={industry._id} value={industry._id}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="filter-box">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              onChange={handleProductCategoryChange}
              value={selectedProductCategory}
            >
              <option value="">ALL CATEGORIES</option>
              {productCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {shop &&
          user &&
          (shop.user === user._id || shop.user?._id === user._id) && (
            <Link
              to="/products/new"
              state={{ shop }}
              className="new-product-btn"
            >
              + NEW PRODUCT
            </Link>
          )}
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
