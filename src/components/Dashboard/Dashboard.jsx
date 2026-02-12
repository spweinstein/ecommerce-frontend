import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="landing-page">
      <div className="hero-layout">
        <div className="text-header">
          <h1>WELCOME, {user.username?.toUpperCase()}</h1>
          <p>SECURE SESSION ACTIVE</p>
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
