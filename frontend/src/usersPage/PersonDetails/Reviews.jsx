import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reviews.css";

const Reviews = () => {
  const navigate = useNavigate();
  const { id ,userName, name ,salary} = useParams(); // Get the ID from the URL
  const seekerId = salary
  const salarySeeker = id
  const seekerName = userName
  const uname = name

  console.log(seekerId ,seekerName, uname ,salarySeeker)

  const [reviewData, setReviewData] = useState({
    name: "",
    rating: "",
    comment: "",
  });

  const [selectedRating, setSelectedRating] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
    
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setReviewData({ ...reviewData, rating: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reviews", {
        ...reviewData, // Include the seeker ID in the review data
        seekerId,
      });
      console.log("Review submitted:", reviewData, seekerId);
      setReviewData({
        name: "",
        rating: "",
        comment: "",
      });
      setSelectedRating(null);
      navigate("/login");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="allForm">
      <div className="Reviews">
        <h1>Leave a Review</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
            // disabled
              type="text"
              name="name"
              value={uname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={rating <= selectedRating ? "star selected" : "star"}
                  onClick={() => handleRatingClick(rating)}
                >
                  &#9733; {/* Unicode character for a filled star */}
                </span>
              ))}
            </div>
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
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
