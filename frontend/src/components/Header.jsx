import React from 'react'
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  
  const handleSubmit = () => {
    alert("Logout");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Wager
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link "> Home </NavLink>  </li>
              {/* <li className="nav-item">
                <NavLink to="/Categories" className="nav-link">
                Categories
                </NavLink>
              </li> */}

          <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" onClick={handleSubmit} className="nav-link">
                Logout
                </NavLink>
              </li>
            
              {/* <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  logout
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart (0)
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header