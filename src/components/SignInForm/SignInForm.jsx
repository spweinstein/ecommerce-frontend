import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./SigninForm.css";

const SigninForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await signIn(formData);
    setUser(userData);
    navigate("/");
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>SIGN IN</h1>
          <p>ACCESS YOUR EXCLUSIVE DASHBOARD</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="auth-actions">
            <button type="submit" className="main-btn">
              LOG IN
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cancel-btn"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SigninForm;
