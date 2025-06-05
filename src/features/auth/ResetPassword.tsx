import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css"; // Make sure this file is created

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ newPassword: string }>();

  const onSubmit = async (data: { newPassword: string }) => {
    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/reset-password", {
        token,
        newPassword: data.newPassword,
      });

      alert("Password reset successful");
      setTimeout(() => {
        navigate("/signin");
      }, 500);
    } catch (error: any) {
      console.error("Reset password failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2 className="reset-title">Reset Your Password</h2>
        <form className="reset-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            placeholder="Enter New Password"
            className="reset-input"
            {...register("newPassword", { required: "Password is required" })}
          />
          {errors.newPassword && (
            <p className="error-text">{errors.newPassword.message}</p>
          )}
          <button className="reset-button" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
