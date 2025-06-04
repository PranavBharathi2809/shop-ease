import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { signUpAPI } from "./Apis/SignUpApis";
import '../features/styles/Signin.css' // ✅ Ensure you import the CSS
import Navbar from "./components/Navbar";

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [Name, setName] = useState("");
  const [Email, setEmailid] = useState("");
  const [Password, setPassword] = useState("");

  const { loading, error, isAuthentication } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(signUpAPI({ Name, Email, Password }));

    if (signUpAPI.fulfilled.match(resultAction)) {
      console.log("Signup succeeded:", resultAction.payload);
    } else {
      console.error("Signup failed:", resultAction.payload || resultAction.error);
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
    <div className="navbar">
    <Navbar/>
    </div>
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={Email}
              onChange={(e) => setEmailid(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {isAuthentication && (
            <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
              Signup successful
            </p>
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

export default SignUp;
