import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, Router, useNavigation } from "react-router-dom";
import "./Header.css";
import { useParams } from "react-router-dom";

function formatImage(buffer) {
  return `data:image/png;base64,${btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )}`;
}

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let { email } = useParams();
  // console.log(email)
  
  const router = useNavigate()

  const navigateToPage = (id)=>{
    setSearchText("")
    router(`/personDetails/${id}/${email}`);
  }

  // console.log(searchResults);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = () => {
    alert("Logout");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ names: searchText }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Wager
          </Link>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={handleInputChange}
            />
          </div>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link ">
                Home
              </NavLink>
            </li>
          
            <li className="nav-item">
              <NavLink to="/" onClick={handleSubmit} className="nav-link">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        {searchText && (
          <div className="findData">
            <div className="cards">
              {searchResults.map((user) => (
                <div key={user.id}>
                  <div className="card">
                    <img
                      src={formatImage(user.image?.data)}
                      className="image"
                      alt="img"
                    />
                    <div className="tourDetails">
                      <h4 className="tourPrice">ID: {user.id}</h4>
                      <h4 className="tourPrice">Name: {user.name}</h4>
                      <h4 className="tourName">Salary: {user.salary}</h4>
                      <h4 className="tourName">Exp: {user.exp}</h4>
                      <h4 className="tourName">Cert: {user.cert}</h4>
                    </div>
                    <button 
                      onClick={() => navigateToPage(user.id)}
                      className="btn btn-success w-100 rounded-4 "
                    >
                      <strong>BOOK </strong>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
{
  /* <h1>{user.name}</h1> */
}
// .slice(2, searchResults.length - 1)
