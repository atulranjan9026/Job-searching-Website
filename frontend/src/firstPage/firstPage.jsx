import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./firstPage.css";
import Workers from "./workers.png";
import Profile from "./profile.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const firstPage = () => {
  return (
    <div>
    <Header/>
      <div className="container">
        <div className="formDiv">
          <Link to="/signupSeeker" className="seeker-btn">
            <img src={Workers} alt="img" />
            <strong>SEEKER</strong>
          </Link>
        </div>
        <div className="formDiv">
          <Link to="/login" className="customer-btn">
            <img src={Profile} alt="img" />
            <strong>CUSTOMER</strong>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default firstPage;
