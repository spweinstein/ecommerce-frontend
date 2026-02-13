import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router"; // Added for navigation

import {
  getCart,
  clearCart,
  addToCart,
  removeFromCart,
} from "../../services/cartService.js";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCart(cart);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemove = (e) => {};

  // This function calculates the total price by multiplying each product's price by its quantity.
  const total = 0;
  //   const total = cartItems.reduce(
  //     (acc, item) => acc + item.product.price * item.quantity,
  //     0,
  //   );

  // This function alerts the user and empties the cart to simulate a successful payment.
  const handlePay = () => {
    alert("Thank you for your order! ✨");
    setCartItems([]);
  };

  // This function removes a specific product from the list by checking against its unique ID.
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.product._id !== id));
  };

  if (!user) {
    return (
      <main className="cart-container">
        <div className="cart-card">
          <p>Please sign in to access this page.</p>
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
          <p>{cart?.items?.length} items currently in your bag</p>
        </header>

        <div className="cart-list">
          {cart?.items?.length > 0 ? (
            cart?.items?.map((item, idx) => (
              <div key={idx} className="cart-item-row">
                <div className="item-info">
                  <span className="item-name">{item.product.name}</span>
                  {/* <span className="item-shop">{item.product.shop.name}</span> */}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="item-pricing">
                  <span>
                    {item.quantity} x ${item.product.price}
                  </span>
                  <strong>${item.product.price * item.quantity}</strong>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-msg">YOUR CART IS EMPTY</div>
          )}
        </div>

        <div className="cart-footer">
          <div className="total-section">
            <span>TOTAL</span>
            <span>${total}</span>
          </div>
          <button
            className="submit-btn"
            onClick={handlePay}
            disabled={cart?.items?.length === 0}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
