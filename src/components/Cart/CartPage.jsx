import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router"; // Added for navigation

const CartPage = () => {
  // Dummy data from backend
  const dummyCartItems = [
    {
      product: {
        _id: "123",
        name: "Product A",
        price: 100,
      },
      quantity: 2,
      shop: {
        _id: "123",
        name: "Shop A",
      },
    },
    {
      product: {
        _id: "345",
        name: "Product B",
        price: 20,
      },
      quantity: 4,
      shop: {
        _id: "123",
        name: "Shop A",
      },
    },
    {
      product: {
        _id: "678",
        name: "Product X",
        price: 50,
      },
      quantity: 1,
      shop: {
        _id: "456",
        name: "Shop B",
      },
    },
  ];

  const [cartItems, setCartItems] = useState(dummyCartItems);
  const { user } = useContext(UserContext);

  // This function calculates the total price by multiplying each product's price by its quantity.
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

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
          <p>{cartItems.length} items currently in your bag</p>
        </header>

        <div className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div key={idx} className="cart-item-row">
                <div className="item-info">
                  <span className="item-name">{item.product.name}</span>
                  <span className="item-shop">{item.shop.name}</span>
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
            disabled={cartItems.length === 0}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
