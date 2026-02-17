import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import "../../styles/forms.css";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await signUp(formData);
    setUser(userData);
    navigate("/");
  };

  const validateSubmission = () => {
    let valid = true;
    if (!formData.username) return false;
    if (
      !formData.password ||
      !formData.passwordConf ||
      formData.password != formData.passwordConf
    )
      return false;
    return true;
  };

  return (
    <main className="form-container">
      <div className="form-card">
        <div className="form-header">
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
          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={!validateSubmission()}
            >
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

export default SignUpForm;
