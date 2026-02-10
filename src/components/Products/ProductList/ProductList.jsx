import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { Link } from "react-router";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return products.length > 0 ? (
    <>
      <h3>Products</h3>
      <button>
        <Link to="/products/new">New Product</Link>
      </button>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div>No products yet</div>
  );
};

export default ProductList;
