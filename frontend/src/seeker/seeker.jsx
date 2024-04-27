import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./seeker.css";

function seeker() {


  const [formData, setFormData] = useState({
    name: "",
    location: "",
    salary: "",
    mobile: "",
    email: "",
    skill: "",
    exp: "",
    cert: "",
    image: "",
  });

  const getSalaryIdx = (salary) => {
    if (salary > 10000) {
      return 0;
    } else if (salary >= 5000 && salary <= 10000) {
      return 1;
    } else if (salary >= 3000 && salary < 5000) {
      return 2;
    } else if (salary >= 2000 && salary < 3000) {
      return 3;
    } else if (salary < 2000) {
      return 4;
    } else {
      return 10;
    }
  };

  const getDistance = (distance) => {
    if (distance > 100) {
      return 0;
    } else if (distance >= 50 && distance <= 100) {
      return 1;
    } else if (distance >= 30 && distance < 50) {
      return 2;
    } else if (distance >= 20 && distance < 30) {
      return 3;
    } else if (distance < 20) {
      return 4;
    } else {
      return 10;
    }
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:5000/ew", formData);

      // Assuming your server responds with a 'result' property
      console.log("response.data.result :", response.data);
      navigate("/login");
      // }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="seekerDr">
        <form className="formDr" onSubmit={handleSubmit}>
      <div className="formDrs">
          <div >
            <label htmlFor="username">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              name="name"
              //   value={formData.name}
              onChange={handleChange}
              className="form-control rounded-2"
            />
          </div>        
          <div >
            <label htmlFor="salary">
              <strong>Salary</strong>
            </label>
            <input
              type="number"
              name="salary"
              //   value={formData.salary}
              onChange={handleChange}
              className="form-control rounded-2"
            />
          </div>
          <div >
            <label htmlFor="salary">
              <strong>Mobile</strong>
            </label>
            <input
              type="number"
              name="mobile"
              //   value={formData.mobile}
              onChange={handleChange}
              className="form-control rounded-2"
            />
          </div>
          <div >
            <label htmlFor="salary">
              <strong>Gmail</strong>
            </label>
            <input
              type="email"
              name="email"
              //   value={formData.email}
              onChange={handleChange}
              className="form-control rounded-2"
            />
          </div>
          <div >
            <label htmlFor="salary">
              <strong>Image</strong>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              //   value={formData.email}
              onChange={handleChange}
              className="form-control rounded-2"
            />
          </div>

      </div>
          {/* ------ */}

          <div className="point2">
          <div >
            <label htmlFor="location">
              <strong>Location</strong>
            </label>
            <select
              id="cars"
              onChange={handleChange}
              name="location"
              //   value={formData.location}
              className="form-control rounded-2"
            >
              <option value="Aizawl">Aizawl</option>
              <option value="silchar">Silchar</option>
              <option value="Guwahati">Guwahati</option>
              <option value="kohima" selected>
                Kohima
              </option>
              <option value="Kolkata" selected>
                {" "}
                Kolkata{" "}
              </option>
              <option value="" selected>
                {" "}
                Choose a Location{" "}
              </option>
            </select>
          </div>
          <div >
            <label htmlFor="skill">
              {" "}
              <strong>Skill </strong>
            </label>

            <select
              id="cars"
              onChange={handleChange}
              name="skill"
              //   value={formData.skill}
              className="form-control rounded-2"
            >
              <option value="Painter">Painter</option>
              <option value="Gardener">Gardener</option>
              <option value="Cook">Cook</option>
              <option value="Driver">Driver</option>
              <option value="Electrician" selected>
                Electrician
              </option>

              <option value="" selected>
                Choose a Skill
              </option>
            </select>
          </div>
          <div >
            <label htmlFor="exp">
              {" "}
              <strong>Experience</strong>
            </label>

            <select
              id="cars"
              onChange={handleChange}
              name="exp"
              //   value={formData.exp}
              className="form-control rounded-2"
            >
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1" selected>
                1
              </option>

              <option value="" selected>
                Choose a Experience
              </option>
            </select>
          </div>
          <div >
            <label htmlFor="cert">
              {" "}
              <strong>Certification</strong>
            </label>

            <select
              id="cars"
              onChange={handleChange}
              name="cert"
              //   value={formData.cert}
              className="form-control rounded-2"
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1" selected>
                1
              </option>

              <option value="" selected>
                Choose a Certification
              </option>
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-success w-100 rounded-2">
              <strong>Submit</strong>
            </button>
          </div>

          </div>
          {/*  */}
        </form>
      </div>
    // </div>
  );
}

export default seeker;
