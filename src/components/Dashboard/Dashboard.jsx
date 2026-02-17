import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext.jsx";
import "../Landing/Landing.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="landing-page">
      <div className="hero-section">
        <div className="text-header">
          <h1>WELCOME, {user.username?.toUpperCase()}</h1>
          <p>SECURE SESSION ACTIVE</p>

          <div className="dashboard-actions">
            <Link to="/shops" className="view-shop-btn">
              BROWSE SHOPS
            </Link>
            <Link to="/shops/new" className="view-shop-btn outline">
              CREATE SHOP
            </Link>
          </div>
        </div>

        <div className="image-frame">
          <img
            src="https://img.pikbest.com/wp/202408/website-online-shopping-in-denmark-an-impressive-3d-render-for-social-media-and-websites_9737255.jpg!sw800"
            alt="3D Shopping Render"
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
