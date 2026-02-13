import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
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

  if (!user) {
    return (
      <main className="form-container">
        <div className="form-card">
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

  return <div>CartPage</div>;
};

export default CartPage;
