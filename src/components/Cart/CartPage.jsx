import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router"; // Added for navigation
import "./CartPage.css";

import {
  getCart,
  clearCart,
  addToCart,
  removeFromCart,
} from "../../services/cartService.js";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // This function finds the item by ID and increases its quantity count by one.
  const handleAddOne = async (id) => {
    await addToCart(id);
    fetchCart();
    // setCartItems((prevCartItems) =>
    //   prevCartItems.map((item) =>
    //     item.product._id === id
    //       ? { ...item, quantity: item.quantity + 1 }
    //       : item,
    //   ),
    // );
  };

  // This function reduces the quantity count by one but prevents it from going below one.
  const handleRemoveOne = async (id) => {
    await removeFromCart(id);
    fetchCart();
    // setCartItems((prevCartItems) =>
    //   cartItems.map((item) =>
    //     item.product._id === id && item.quantity > 1
    //       ? { ...item, quantity: item.quantity - 1 }
    //       : item,
    //   ),
    // );
  };

  // This function completely removes a specific product from the list regardless of its quantity.
  const handleClearItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.product._id !== id));
  };

  // This function empties the entire cart by setting the list back to an empty array.
  const handleClearCart = async () => {
    await clearCart();
    fetchCart();
    // setCartItems([]);
  };

  // This variable calculates the final price by multiplying each item's price by its quantity.
  const total = cartItems
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  if (!user) {
    return (
      <main className="cart-container">
        <div className="cart-card">
          <p>Please sign in to access your cart.</p>
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

  return (
    <main className="cart-container">
      <div className="cart-card">
        <header className="cart-header">
          <h1>Shopping Cart</h1>

          {cartItems.length > 0 && (
            <button className="clear-all-btn" onClick={handleClearCart}>
              Clear Entire Cart
            </button>
          )}
        </header>

        <div className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product._id} className="cart-item-row">
                <div className="item-info">
                  <span className="item-name">{item.product.name}</span>
                  {/* <span className="item-shop">{item.shop.name}</span> */}
                  <button
                    className="btn-clear-item"
                    onClick={() => handleClearItem(item.product._id)}
                  >
                    Clear Item
                  </button>
                </div>

                <div className="item-controls">
                  <div className="qty-selector">
                    <button
                      className="qty-btn btn-remove"
                      onClick={() => handleRemoveOne(item.product._id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn btn-add"
                      onClick={() => handleAddOne(item.product._id)}
                    >
                      +
                    </button>
                  </div>
                  <strong>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-msg">YOUR BAG IS EMPTY</div>
          )}
        </div>

        <div className="cart-total-section">
          <span>TOTAL</span>
          <span>${total}</span>
        </div>

        <button className="submit-btn" disabled={cartItems.length === 0}>
          CHECKOUT
        </button>
      </div>
    </main>
  );
};

export default CartPage;
