import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext.jsx";
import "../Landing/Landing.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="landing-page">
      <div className="hero-layout">
        <div className="text-header">
          <h1>WELCOME, {user.username?.toUpperCase()}</h1>
          <p>SECURE SESSION ACTIVE</p>

          <div
            className="dashboard-actions"
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <Link
              to="/shops"
              className="view-shop-btn"
              style={{ padding: "15px 30px" }}
            >
              BROWSE SHOPS
            </Link>
            <Link
              to="/shops/new"
              className="view-shop-btn"
              style={{
                padding: "15px 30px",
                background: "transparent",
                color: "#000",
                border: "1px solid #000",
              }}
            >
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
