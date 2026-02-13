import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Link } from "react-router";
import "./CartPage.css";

const CartPage = () => {
  const dummyCartItems = [
    {
      product: { _id: "123", name: "Product A", price: 100 },
      quantity: 2,
      shop: { _id: "123", name: "Shop A" },
    },
    {
      product: { _id: "345", name: "Product B", price: 20 },
      quantity: 4,
      shop: { _id: "123", name: "Shop A" },
    },
    {
      product: { _id: "678", name: "Product X", price: 50 },
      quantity: 1,
      shop: { _id: "456", name: "Shop B" },
    },
  ];

  const [cartItems, setCartItems] = useState(dummyCartItems);
  const { user } = useContext(UserContext);

  // This function finds the item by ID and increases its quantity count by one.
  const addOne = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  // This function reduces the quantity count by one but prevents it from going below one.
  const removeOne = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // This function completely removes a specific product from the list regardless of its quantity.
  const clearItem = (id) => {
    setCartItems(cartItems.filter((item) => item.product._id !== id));
  };

  // This function empties the entire cart by setting the list back to an empty array.
  const clearCart = () => {
    setCartItems([]);
  };

  // This variable calculates the final price by multiplying each item's price by its quantity.
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

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
            <button className="clear-all-btn" onClick={clearCart}>
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
                  <span className="item-shop">{item.shop.name}</span>
                  <button
                    className="btn-clear-item"
                    onClick={() => clearItem(item.product._id)}
                  >
                    Clear Item
                  </button>
                </div>

                <div className="item-controls">
                  <div className="qty-selector">
                    <button
                      className="qty-btn btn-remove"
                      onClick={() => removeOne(item.product._id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn btn-add"
                      onClick={() => addOne(item.product._id)}
                    >
                      +
                    </button>
                  </div>
                  <strong>${item.product.price * item.quantity}</strong>
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
