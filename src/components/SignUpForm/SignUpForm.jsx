import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignupForm.css";

const SignupForm = ({ handleSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(formData);
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>SIGN UP</h1>
          <p>CREATE YOUR EXCLUSIVE ACCOUNT</p>
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
          <div className="input-group">
            <label htmlFor="passwordConf">Confirm Password</label>
            <input
              type="password"
              id="passwordConf"
              name="passwordConf"
              value={formData.passwordConf}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="auth-actions">
            <button type="submit" className="main-btn">
              CREATE ACCOUNT
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

export default SignupForm;
