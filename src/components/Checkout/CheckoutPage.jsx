import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { getCart } from "../../services/cartService";
import {
  validateCheckout,
  submitCheckout,
} from "../../services/checkoutService";
import ShopSection from "./ShopSection";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingSelections, setShippingSelections] = useState({});
  const [checkoutData, setCheckoutData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  useEffect(() => {
    if (cartItems.length > 0) {
      validateCart();
    }
  }, [cartItems, shippingSelections]);

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const validateCart = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await validateCheckout({
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingSelections,
      });

      // Backend returns: { valid, errors, data: { shops, grandTotal } }
      setCheckoutData(result);

      // Initialize shipping selections from backend response if first time
      if (Object.keys(shippingSelections).length === 0 && result.shops?.shops) {
        const initialShipping = {};
        result.data.shops.forEach((shop) => {
          initialShipping[shop.shopId] = "standard";
        });
        setShippingSelections(initialShipping);
      }

      if (!result.valid && result.errors?.length > 0) {
        setError(result.errors.map((e) => e.message).join(", "));
      }
    } catch (err) {
      console.error(err);
      setError("Unable to validate checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingChange = (shopId, shippingId) => {
    setShippingSelections((prev) => ({ ...prev, [shopId]: shippingId }));
    setError(null);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await submitCheckout({
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingSelections,
      });
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <main className="checkout-container">
        <div className="checkout-card">
          <p>Please sign in to checkout.</p>
          <Link to="/sign-in" className="submit-btn">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-container">
        <div className="checkout-card">
          <h1>Checkout</h1>
          <p>Your cart is empty.</p>
          <Link to="/products" className="submit-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const isBusy = isLoading || isSubmitting;
  const shops = checkoutData?.data?.shops || [];

  return (
    <main className="checkout-container">
      <div className="checkout-card">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="checkout-content">
          {shops.map((shopData) => (
            <ShopSection
              key={shopData.shopId}
              shopData={shopData}
              shippingSelection={shippingSelections[shopData.shopId]}
              onShippingChange={handleShippingChange}
              disabled={isBusy}
            />
          ))}
        </div>

        <div className="checkout-footer">
          <div className="grand-total">
            <span>Subtotal:</span>
            <span>${checkoutData?.data?.subtotal?.toFixed(2) || "..."}</span>
          </div>
          <div className="grand-total">
            <span>Shipping Cost:</span>
            <span>
              ${checkoutData?.data?.shippingTotal?.toFixed(2) || "..."}
            </span>
          </div>
          <div className="grand-total">
            <span>Tax Total:</span>
            <span>${checkoutData?.data?.taxTotal?.toFixed(2) || "..."}</span>
          </div>
          <div className="grand-total">
            <span>Grand Total:</span>
            <span>${checkoutData?.data?.grandTotal?.toFixed(2) || "..."}</span>
          </div>

          <div className="checkout-actions">
            <Link to="/cart" className="back-btn">
              Back to Cart
            </Link>
            <button
              className="submit-btn"
              onClick={handlePlaceOrder}
              disabled={isBusy || !checkoutData?.valid}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
