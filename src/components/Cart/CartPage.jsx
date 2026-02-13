import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import {
  getCart,
  clearCart,
  addToCart,
  removeFromCart,
} from "../../services/cartService.js";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemove = (e) => {};

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

  return <main>Cart page</main>;
};

export default CartPage;
