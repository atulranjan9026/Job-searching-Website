import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./firstPage.css";
import Workers from "./workers.png";
import Profile from "./profile.png";

const FirstPage = () => {
  useEffect(() => {
    const injectScript = document.createElement('script');
    injectScript.src = '/js/inject.js'; // Local path
    injectScript.async = true;
    document.body.appendChild(injectScript);
  
    const configScript = document.createElement('script');
    configScript.src = '/js/config.js'; // Local path
    configScript.async = true;
    document.body.appendChild(configScript);
  
    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
    };
  }, []);
  return (
    <div>
      <header>
        {/* <h1>Welcome to the Home Page</h1> */}
      </header>
      {/* <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav> */}
      <main>
        {/* <h2>About Us</h2> */}
        <div className="containerFirst">
          <div className="formDiv">
            <Link to="/loginSeeker" className="seeker-btn">
              <img src={Workers} alt="Seeker" />
              <strong>SEEKER</strong>
            </Link>
          </div>
          <div className="formDiv">
            <Link to="/login" className="customer-btn">
              <img src={Profile} alt="Customer" />
              <strong>CUSTOMER</strong>
            </Link>
          </div>
          <div className="formDiv">
            <Link to="/admin" className="Admin-btn">
              <img src={Profile} alt="Customer" />
              <strong>Admin</strong>
            </Link>
          </div>
        </div>
      </main>
      {/* <footer>
        &copy; 2024 Your Website. All rights reserved.
      </footer> */}
    </div>
  );
};

export default FirstPage;
