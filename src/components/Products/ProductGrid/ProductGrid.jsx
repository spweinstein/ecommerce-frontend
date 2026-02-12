import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { Link } from "react-router";
import ProductCard from "../ProductCard/ProductCard.jsx";
import "./ProductGrid.css";

const ProductGrid = ({ shop, user }) => {
  const [products, setProducts] = useState([]);
  // console.log(shop.user, user._id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (shop && shop._id) {
          const fetchedProducts = await productService.getProducts(shop._id);
          setProducts(fetchedProducts);
        } else {
          const fetchedProducts = await productService.getProducts();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [shop]);

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h3>Products</h3>
        {shop && user && shop.user === user._id && (
          <Link to="/products/new" state={{ shop }} className="new-product-btn">
            New Product
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
