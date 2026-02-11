import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { Link } from "react-router";

const ProductList = ({ shop, user }) => {
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
    <>
      <h3>Products</h3>
      {shop && user && shop.user === user._id ? (
        <button>
          <Link to="/products/new" state={{ shop }}>
            New Product
          </Link>
        </button>
      ) : (
        ""
      )}
      {products.length > 0 ? (
        <>
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
      )}
    </>
  );
};

export default ProductList;
