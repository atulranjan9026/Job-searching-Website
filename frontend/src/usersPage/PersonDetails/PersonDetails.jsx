import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PersonDetails.css";

function formatImage(buffer) {
  return `data:image/png;base64,${btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )}`;
}

const PersonDetails = () => {
  let { id, email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [bookingAccepted, setBookingAccepted] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: "",
    salary: "",
    comment: "",
  });
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const seekerId = id;
  const userEmail = email;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userlogin/${email}`);
        const data = response.data;
        setUserData({
          id: data.id,
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [email]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const responseId = await fetch("http://localhost:5000/resultData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ids: [id] }),
        });

        const dataId = await responseId.json();
        setUser(dataId[0]);
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reqbooking", {
        ...reviewData,
        userEmail,
        seekerId,
        email: user.email,
        name: userData.name,
        userId: userData.id,
      });
      console.log("Review submitted:", reviewData, userEmail, seekerId, user.email, userData.id, userData.name);
      setReviewData({
        name: userData.name,
        salary: "",
        comment: "",
      });
      navigate(`/form/${user.email}`);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return { average: 0, totalReviews: 0 };
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = (total / reviews.length).toFixed(2);
    return { average, totalReviews: reviews.length };
  };

  return (
    <div>
      <div>
        {user && (
          <div className="Details">
            <div className="Detail-container">
              <div className="cardprincipal">
                <div className="content">
                  <div className="image-container">
                    {user.image && (
                      <img
                        src={formatImage(user.image.data)}
                        className="image"
                        alt="img"
                      />
                    )}
                  </div>
                  <div className="details">
                    <h4 className="tourPrice">Name: {user.name}</h4>
                    <h4 className="tourName">Salary: {user.salary}</h4>
                    <h4 className="tourName">Experiences: {user.exp}</h4>
                    <h4 className="tourName">Certificate: {user.cert}</h4>
                    <h4 className="tourName">Certificate: {user.email}</h4>
                    <div>
                      <h4>Rating: {calculateAverageRating().average}</h4>
                      <h4>Total Reviews: {calculateAverageRating().totalReviews}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {bookingAccepted && (
                <div className="alert alert-success" role="alert">
                  Booking accepted successfully!
                </div>
              )}
            </div>
            <div className="payment">
              <h4 className="tourName">Total Payable: {user.salary}</h4>
              <div>
                <h4><strong>Booking</strong></h4>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      disabled
                      required
                    />
                  </div>
                  <div>
                    <label>Salary:</label>
                    <input
                      type="number"
                      name="salary"
                      value={reviewData.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Comment:</label>
                    <textarea
                      name="comment"
                      value={reviewData.comment}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit">Book</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
