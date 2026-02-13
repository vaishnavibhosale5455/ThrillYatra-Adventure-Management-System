import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../API/api";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      mobileNumber: "",
      password: "",
      address: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .matches(/^[A-Za-z\s]+$/, "Only letters and spaces allowed")
        .required("Name is required"),

      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      age: Yup.number()
        .typeError("Age must be a number")
        .min(18, "You must be at least 18 years old")
        .max(60, "Age must be below 60")
        .required("Age is required"),

      mobileNumber: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
        .required("Mobile number is required"),

      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[a-z]/, "At least one lowercase letter")
        .matches(/\d/, "At least one number")
        .matches(
          /[@$!%*?&]/,
          "At least one special character",
        )
        .required("Password is required"),

      address: Yup.string()
        .min(10, "Address must be at least 10 characters")
        .max(200, "Address too long")
        .required("Address is required"),
    }),

    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        age: Number(values.age),
        mobileNumber: values.mobileNumber,
        password: values.password,
        address: values.address,
      };

      try {
        await registerUser(payload);
        toast.success("Registration successful!");
        navigate("/login");
      } catch {
        toast.error("Registration failed. Try again.");
      }
    },
  });

  return (
    <div className="auth-page">
      <ToastContainer />

      <div className="auth-card register-card shadow-lg">
        <h2 className="text-center mb-3">
          Join <span className="brand">ThrillYatra</span>
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "age", label: "Age", type: "number" },
            { name: "mobileNumber", label: "Mobile Number", type: "text" },
            { name: "password", label: "Password", type: "password" },
          ].map((field) => (
            <div className="mb-2" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                {...formik.getFieldProps(field.name)}
                className="form-control"
              />
              {formik.touched[field.name] &&
                formik.errors[field.name] && (
                  <small className="text-danger">
                    {formik.errors[field.name]}
                  </small>
                )}
            </div>
          ))}

          <div className="mb-2">
            <label>Address</label>
            <textarea
              rows="2"
              {...formik.getFieldProps("address")}
              className="form-control"
            />
            {formik.touched.address && formik.errors.address && (
              <small className="text-danger">
                {formik.errors.address}
              </small>
            )}
          </div>

          <button type="submit" className="btn auth-btn w-100 mt-3">
            Create Account
          </button>
        </form>

        <div className="signin-box mt-4 text-center">
          <p className="signin-text">
            Already riding with <span>ThrillYatra</span>?
          </p>

          <Link to="/login" className="btn signin-btn">
            Continue Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
