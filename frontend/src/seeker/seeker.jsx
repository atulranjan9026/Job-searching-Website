import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./seeker.css";

function Seeker() {
  let { email } = useParams();
  const [dataSe, setDataSe] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingData, setBookingData] = useState([]);
console.log(bookings)

const [formData, setFormData] = useState({
  id: "",
  name: "",
  location: "",
  salary: "",
  mobile: "",
  email: "",
  skill: "",
  exp: "",
  cert: "",
  image: null,
});

const handleAcceptJob = async (email, salary, name, userId ,userEmail) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/accept",
      { email, salary, name, userId, userEmail }
    );
    console.log(response.data);
    // Handle success response, e.g., update UI to show booking as accepted
  } catch (error) {
    console.error("Error accepting job:", error);
    // Handle error, e.g., show error message to user
  }
};

// useEffect(() => {
//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/reqbooking/${email}`
//       );
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };
//   fetchBookings();
// }, [email]); // Include email in the dependency array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/seeker/${email}`
        );
        const data = response.data;
        setFormData({
          id: data.id,
          name: data.name,
          location: data.location,
          salary: data.salary,
          mobile: data.mobile,
          email: data.email,
          skill: data.skill,
          exp: data.exp,
          cert: data.cert,
          image: null, // File inputs can't be pre-filled
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [email]);

  const id = formData.id;
  console.log(id);
  // console.log(reviews[2].seekerId)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        setError("Error retrieving reviews");
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });
  
      const response = await axios.put(
        `http://localhost:5000/seeker/${email}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("response.data.result :", response.data);
      navigate("/loginSeeker");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
   // Function to calculate the average rating
   const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(2);
  };
  // get reqBooking
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reqbooking/${email}`);
        setBookings(response.data);
        console.log(setBookings)
      } catch (error) {
        setError('Error fetching bookings');
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [email]); // Include email in the dependency array

  


  return (
    <div className="Admin">
      <div className="seekerDr">
        <form className="formDr" onSubmit={handleSubmit}>
          <div className="formDrs">
            <div>
              <label htmlFor="username">
                <strong>Name</strong>
              </label>
              <input
                disabled
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control rounded-2"
              />
            </div>
            <div>
              <label htmlFor="salary">
                <strong>Salary</strong>
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="form-control rounded-2"
              />
            </div>
            <div>
              <label htmlFor="mobile">
                <strong>Mobile</strong>
              </label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-control rounded-2"
              />
            </div>
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                disabled
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control rounded-2"
              />
            </div>
            <div>
              <label htmlFor="image">
                <strong>Image</strong>
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="form-control rounded-2"
              />
            </div>
          </div>
          <div className="point2">
            <div>
              <label htmlFor="location">
                <strong>Location</strong>
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={handleChange}
                name="location"
                className="form-control rounded-2"
              >
                <option value="">Choose a Location</option>
                <option value="Aizawl">Aizawl</option>
                <option value="Silchar">Silchar</option>
                <option value="Guwahati">Guwahati</option>
                <option value="Kohima">Kohima</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
            <div>
              <label htmlFor="skill">
                <strong>Skill</strong>
              </label>
              <select           
                id="skill"
                value={formData.skill}
                onChange={handleChange}
                name="skill"
                className="form-control rounded-2"
              >
                <option value="">Choose a Skill</option>
                <option value="Painter">Painter</option>
                <option value="Gardener">Gardener</option>
                <option value="Cook">Cook</option>
                <option value="Driver">Driver</option>
                <option value="Electrician">Electrician</option>
              </select>
            </div>
            <div>
              <label htmlFor="exp">
                <strong>Experience</strong>
              </label>
              <select
                id="exp"
                value={formData.exp}
                onChange={handleChange}
                name="exp"
                className="form-control rounded-2"
              >
                <option value="">Choose an Experience</option>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
                <option value="7">7</option>
                <option value="6">6</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <label htmlFor="cert">
                <strong>Certification</strong>
              </label>
              <select
                id="cert"
                value={formData.cert}
                onChange={handleChange}
                name="cert"
                className="form-control rounded-2"
              >
                <option value="">Choose a Certification</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <button type="submit" className="btd-submit">
                <strong>Submit</strong>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div>
        <div className="AdminPage">
      <h2>Booking Details</h2>
      <table>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Salary</th>
                  <th>Comment</th>
                  <th>userEmail</th>
                  <th>Why Do You Want This Job?</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.name}</td>
                    <td>{booking.salary}</td>
                    <td>{booking.email}</td>
                    <td>{booking.userEmail}</td>
                    <td>
                      {!booking.accepted ? (
                        <button onClick={() => handleAcceptJob(booking.email, booking.salary, booking.name,booking.userId,booking.userEmail)}>
                          Accept Job
                        </button>
                      ) : (
                        <span>Accepted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </div>
        </div>
      </div>
      <div className="form-container">
          <h1 className="form-title">Reviews</h1>
          <h5>Total Rating Average: {calculateAverageRating()}</h5>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h5>Name : {review.name}</h5>
                {/* <p>{review.comment}</p> */}
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default Seeker;
