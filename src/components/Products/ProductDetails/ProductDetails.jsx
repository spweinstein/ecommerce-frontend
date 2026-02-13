import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { addToCart } from "../../../services/cartService.js";
import { useParams, Link, useNavigate } from "react-router";
import "./ProductDetails.css";

const ProductDetails = ({ user }) => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    await productService.deleteProduct(productId);
    navigate(`/shops/${product.shop._id}`);
  };

  const handleAddToCart = async () => {
    await addToCart(productId);
    navigate(`/cart`);
  };

  if (!product)
    return (
      <main className="product-details-page">
        <p>Loading...</p>
      </main>
    );

  const isOwner = product.user === user?._id || product.user?._id === user?._id;

  return (
    <main className="product-details-page">
      <div className="details-header details-header--bordered">
        <div className="product-title-group">
          <h1>{product.name}</h1>
          <p className="breadcrumb">
            Shop: <span>{product.shop.name}</span>
          </p>
          <p>Category: {product.category.name}</p>
        </div>
        {user && isOwner && (
          <div className="actions">
            <Link to={`/products/${product._id}/edit`} className="btn-edit">
              Edit Product
            </Link>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="product-main-content">
        <section className="details-box">
          <div className="info-group">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="label">Price</span>
              <span className="value price-tag">${product.price}</span>
            </div>
            <div className="spec-item">
              <span className="label">Brand</span>
              <span className="value">{product.brand}</span>
            </div>
            <div className="spec-item">
              <span className="label">SKU</span>
              <span className="value">{product.sku}</span>
            </div>
          </div>

          <div className="shipping-info">
            {product.weight > 0 && (
              <p>
                <b>Weight:</b> {product.weight} lbs
              </p>
            )}
            {product.length > 0 && (
              <p>
                <b>Dimensions:</b> {product.length}" x {product.width}" x{" "}
                {product.height}"
              </p>
            )}
            <p>Standart Or Express Shipping On Each Item</p>
          </div>

          {/* One comment: Primary Add to Cart button styled with the new boxed CSS */}
          {user && (
            <button className="add-to-cart-boxed" onClick={handleAddToCart}>
              Add to Cart — ${product.price}
            </button>
          )}
        </section>

        <section className="image-box">
          {product.imgURL ? (
            <img src={product.imgURL} alt={product.name} />
          ) : (
            <div className="image-placeholder">
              <p>📸 Image Placeholder</p>
            </div>
          )}
        </section>
      </div>

      <div className="footer-nav">
        <Link to={`/shops/${product.shop._id}`} className="btn-back">
          ← Back to {product.shop.name}
        </Link>
      </div>
    </main>
  );
};

export default ProductDetails;
