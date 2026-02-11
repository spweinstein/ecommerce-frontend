import { useState, useEffect } from "react";
import * as productService from "../../../services/productService.js";
import { useParams, Link, useNavigate } from "react-router";

const ProductDetails = ({ user }) => {
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
    navigate(`/shops/${product.shop._id}`);
  };

  if (!product)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  const isOwner = product.user === user?._id || product.user?._id === user?._id;

  return (
    <div>
      <header>
        <h3>{product.name}</h3>
        <p>Shop: {product.shop.name}</p>
        {isOwner && (
          <>
            <button>
              <Link to={`/products/${product._id}/edit`}>Edit</Link>
            </button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </header>
      <main>
        <section>
          {" "}
          <p>
            <b>Description</b>: {product.description}
          </p>
        </section>

        <section>
          <p>
            <b>Price:</b> ${product.price}
          </p>
          <p>
            <b>Brand:</b> {product.brand}
          </p>
          <p>
            <b>SKU:</b> {product.sku}
          </p>
        </section>

        <section>
          {typeof product.weight === "number" ? (
            <p>
              <b>Weight:</b> {product.weight} lbs
            </p>
          ) : (
            ""
          )}
          {product?.length > 0 && product?.width > 0 && product?.height > 0 ? (
            <p>
              <b>Dimensions:</b> ({product.length})x({product.width})x($
              {product.height})
            </p>
          ) : (
            ""
          )}
        </section>

        <button>
          <Link to={`/shops/${product.shop._id}`}>To Shop</Link>
        </button>
      </main>
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
