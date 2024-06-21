import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from './LoginValidation';
import "./Login.css"; // Import the CSS file

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

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

    if (err.email === "" && err.password === "") {
      axios
        .post("http://localhost:5000/auth/login", values)
        .then((res) => {
          if (res.data.errors) {
            setBackendError(res.data.errors);
            console.log(setBackendError)
          } else {
            setBackendError([]);
            if (res.data === "Success") {
              navigate(`/form/${values.email}`);
            } else {
              alert("No record existed");
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }
  
  return (
    <div className="login">
      <div className="logincss">
        <div className="bg-white p-3 rounded">
          <h2>Sign-In</h2>
          {backendError ? (
            backendError.map((e) => <p className="text-danger">{e.msg}</p>)
          ) : (
            <span></span>
          )}
          <form action="/" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
            <p>You agree to our terms and policies</p>
            <Link
              to="/signup"
              className="btn btn-default border w-100 bg-danger rounded-0 text-decoration-none"
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
