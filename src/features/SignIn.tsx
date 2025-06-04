import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { signInAPI } from "./Apis/SignInAPis";
import '../features/styles/Signin.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { loading, error, isAuthentication } = useSelector((state: RootState) => state.auth);

  // Clear error on input change by dispatching some reset action or manage local error here
  // Here just assuming error is from Redux, so we'll not clear it from here 
  // But you could implement a resetError action in your slice if needed.

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const result = await dispatch(signInAPI({ Email: email, Password: password })).unwrap();

      // ✅ Store email in localStorage to use later (e.g., in PaymentPage)
    localStorage.setItem("userEmail", result.email)
      // No need to navigate here - useEffect handles it
    } catch (err) {
      // error handled by slice, optionally handle here too
      console.error("Sign-in failed:", err);
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (isAuthentication) {
      navigate("/payment");
    }
  }, [isAuthentication, navigate]);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleSignIn} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={loading || !email || !password}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <Link to="/signup" className="btn-signup">Create Account</Link>

            {isAuthentication && (
              <p style={{ color: "green" }}>Signin successful</p>
            )}
            {error && !isAuthentication && (
              <span className="text-danger">{error}</span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
