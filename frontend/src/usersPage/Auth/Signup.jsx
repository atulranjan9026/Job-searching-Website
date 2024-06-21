import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from './SignupValidation';
import "./Signup.css";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    console.log(values);

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", values);
      console.log("response.data.result:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="bg-white p-3 rounded">
          <h2>Sign-Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.name && (
                <span className="text-danger"> {errors.name}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.email && (
                <span className="text-danger"> {errors.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.password && (
                <span className="text-danger"> {errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Sign up
            </button>
            <p>You agree to our terms and policies</p>
            <Link
              to="/login"
              className="btn btn-default border w-100 bg-danger rounded-0 text-decoration-none"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
