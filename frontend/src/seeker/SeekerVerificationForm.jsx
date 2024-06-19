import React, { useState } from "react";
import axios from "axios";

const SeekerVerificationForm = ({ seekerId }) => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (event) => {
    setVerificationStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      // Make a request to update the seeker verification status
      const response = await axios.put(`/seeker/${seekerId}/verify`, {
        verified: verificationStatus === "verified" ? true : false,
      });

      // Check if the request was successful
      if (response.data.success) {
        // Display success message
        setSuccessMessage("Seeker verification updated successfully.");
      } else {
        setError("Failed to update seeker verification.");
      }
    } catch (error) {
      setError("Error updating seeker verification.");
      console.error("Error updating seeker verification:", error);
    }
  };

  return (
    <div>
      <h2>Seeker Verification Form</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Verification Status:
          <select value={verificationStatus} onChange={handleChange}>
            <option value="">Select</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SeekerVerificationForm;
