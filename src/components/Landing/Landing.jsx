import "./Landing.css";

const Landing = ({ user }) => {
  return (
    <main className="landing-page">
      {user ? (
        <div className="welcome-hero-box">
          <h1>🛍️ Welcome, {user.username}!</h1>
          <p>
            You are now logged into your dashboard. Manage your shops and
            products below.
          </p>
        </div>
      ) : (
        <div className="guest-hero-box">
          <h1>Hello, you are on the landing page for visitors.</h1>
          <p>Sign up now, or sign in to see your super secret dashboard!</p>
        </div>
      )}
    </main>
  );
};

export default Landing;
