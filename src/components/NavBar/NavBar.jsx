import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shops">Shops</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {user ? (
          <>
            <li className="welcome-box">
              <span>🛍️ Welcome, {user.username}</span>
            </li>
            <li>
              <Link to="/" onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
