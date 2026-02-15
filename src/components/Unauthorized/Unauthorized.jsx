import { Link } from "react-router";
import "./Unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <h1>🔒 Access Denied</h1>
        <p>You don't have permission to access this resource.</p>
        <div className="unauthorized-actions">
          <Link to="/" className="btn-primary">
            Go to Home
          </Link>
          <Link to="/shops" className="btn-secondary">
            Browse Shops
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
