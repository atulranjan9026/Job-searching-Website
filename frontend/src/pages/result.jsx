import React, { useEffect, useState } from "react";
import "../../styles/AuthStyles.css";
import "./Home.css";
import axios from 'axios';
import { Link , useNavigate } from "react-router-dom";

// Define the formatImage function
function formatImage(buffer) {
  return `data:image/png;base64,${btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )}`;
}

const Result = () => {
  const [idData, setIdData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Placeholder for mostCommonClass and ids
        const mostCommonClass = "your_most_common_class";
        const ids = [1, 2, 3]; // Replace with your actual IDs

        const responseId = await fetch("http://localhost:5000/resultData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: mostCommonClass, ids }),
        });

        const dataId = await responseId.json();
        console.log("resultData :", dataId[0], dataId[0].name);

        // Update state with the fetched data
        setIdData(dataId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function inside useEffect
    fetchData();
  }, []); // Empty dependency array since we don't have any dependencies

  return (
    <div>
      <div className="cards">
        {idData.map((user) => (
          <div key={user.name}>
            <div className="card">
              <img src={formatImage(user.image.data)} className="image" alt="img" />
              <div className="tourDetails">
                <h4 className="tourPrice">ID: {user.id}</h4>
                <h4 className="tourPrice">Name: {user.name}</h4>
                <h4 className="tourName">Salary: {user.salary}</h4>
                <h4 className="tourName">Mobile: {user.mobile}</h4>
                <h4 className="tourName">Email: {user.email}</h4>
                <h4 className="tourName">Exp: {user.exp}</h4>
                <h4 className="tourName">Cert: {user.cert}</h4>
              </div>
              <Link
            to="/order"
            className="btn btn-success w-100 rounded-4 "
          >
            <strong>BOOK</strong>
          </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
