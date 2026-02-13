import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../API/api"; 
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        const user = response.data;
        const principal = user.authenticatedDetails.principal;

  
        sessionStorage.setItem("userName", principal.name);
        sessionStorage.setItem("userId", principal.id);
        sessionStorage.setItem("userRole", principal.role);
        sessionStorage.setItem("userAge", principal.age); 
        sessionStorage.setItem("jwtToken", user.jwt);

        toast.success("Login successful!", { autoClose: 1000 });

        if (principal.role === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch {
        toast.error("Invalid email or password", {
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div className="auth-page">
      <ToastContainer />

      <div className="auth-card shadow-lg">
        <h2 className="text-center mb-4 thrill-title">
          Welcome to ThrillYatra
        </h2>

        <p className="text-center thrill-subtitle">
          Sign in to continue your adventure
        </p>

        <form onSubmit={formik.handleSubmit}>
        
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">
                {formik.errors.email}
              </small>
            )}
          </div>

        
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className="form-control"
            />
            {formik.touched.password &&
              formik.errors.password && (
                <small className="text-danger">
                  {formik.errors.password}
                </small>
              )}
          </div>

          <button type="submit" className="btn auth-btn w-100 mt-3">
            Login
          </button>
        </form>

        <div className="signup-box mt-4 text-center">
          <p className="signup-text">
            New to <span>ThrillYatra</span>?
          </p>

          <Link to="/register" className="btn signup-btn">
            Create Your Account
          </Link>
        </div>

        <div className="text-center mt-3">
          <p>
            Forgot password?
            <Link
              to="/forgotpassword"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <strong> Click here</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
