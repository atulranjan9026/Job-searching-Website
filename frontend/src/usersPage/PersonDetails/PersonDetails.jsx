import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./PersonDetails.css";

function formatImage(buffer) {
  return `data:image/png;base64,${btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )}`;
}

const PersonDetails = () => {
  let { id } = useParams();
  const [user, setUser] = useState(null);

  console.log("user", user);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        // Placeholder for mostCommonClass and ids
        const mostCommonClass = "your_most_common_class";

        const ids = [id]; // Replace with your actual IDs

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
        setUser(dataId[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function inside useEffect
    fetchData();
  }, []); // Empty dependency array since we don't have any dependencies

  return (
    <div className="Details">
    <div className="Detail-container">
      {user && (
        <div className="cardprincipal">
          <div class="content">
            <div class="image-container">
              {user.image && (
                <img
                  src={formatImage(user.image.data)}
                  className="image"
                  alt="img"
                />
              )}
            </div>
            <div class="details">
              {/* <h4 className="tourPrice">ID: {user.id}</h4> */}
              <h4 className="tourPrice">Name: {user.name}</h4>
              <h4 className="tourName">Salary: {user.salary}</h4>
              <h4 className="tourName">Mobile: {user.mobile}</h4>
              <h4 className="tourName">Email: {user.email}</h4>
              <h4 className="tourName">Exp: {user.exp}</h4>
              <h4 className="tourName">Cert: {user.cert}</h4>
            </div>
          </div>
          <div class="btn-container">
            <Link to="" className="btn btn-success w-100 rounded-4 ">
              <strong>BOOK</strong>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default PersonDetails;
