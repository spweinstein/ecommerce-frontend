import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { useParams, Link, useNavigate } from "react-router";

const ProductDetails = () => {
  const [product, setProduct] = useState({
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
    shop: {},
  });
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productService.getProduct(productId);
        setProduct(product);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    await productService.deleteProduct(productId);
    navigate("/products");
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Brand: {product.brand}</p>
      <p>SKU: {product.sku}</p>
      {typeof product.weight === "number" ? (
        <p>Weight: {product.weight}</p>
      ) : (
        ""
      )}
      {product?.length > 0 && product.width > 0 && product.height > 0 ? (
        <p>
          Dimensions: ({product.length})x({product.width})x(${product.height})
        </p>
      ) : (
        ""
      )}
      <p>Shop: {product.shop.name}</p>
      <button>
        <Link to={`/products/${product._id}/edit`}>Edit</Link>
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );

  //   return product?.name ? (
  //     <h3>Loading...</h3>
  //   ) : (
  //     <div>
  //       <h3>{product.name}</h3>
  //     </div>
  //   );
};

export default ProductDetails;
