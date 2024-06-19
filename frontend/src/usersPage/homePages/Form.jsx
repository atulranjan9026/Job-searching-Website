import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
import Productcategory  from "../../Productcategory/Productcategory";
import BookingStatus from "../PersonDetails/BookingStatus";

// Function to calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }

  return Math.pow(sum, 0.5);
}

function formatImage(buffer) {
  return `data:image/png;base64,${btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )}`;
}

// KNN algorithm function
function knn(dataknn, queryPoint, k, setDistances) {
  // Calculate distances between query point and all data points
  const distances = dataknn.map((point) => ({
    point,
    distance: euclideanDistance(queryPoint, point.features),
  }));

  // Sort distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Set distances for display
  setDistances(distances);

  // Select the first k neighbors
  const kNeighbors = distances.slice(0, k);

  // Count occurrences of each class in the k neighbors
  const classCounts = {};
  kNeighbors.forEach((neighbor) => {
    const label = neighbor.point.label; // Assuming each data point has a 'label' property
    classCounts[label] = (classCounts[label] || 0) + 1;
  });

  // Find the most common class among the k neighbors
  let maxCount = 0;
  let mostCommonClass;
  for (const label in classCounts) {
    if (classCounts[label] > maxCount) {
      maxCount = classCounts[label];
      mostCommonClass = label;
    }
  }

  return { mostCommonClass, distances };
}

// Example KNNApp component
function KNNApp({ moveToResultPage }) {
  // Sample data
  const [dataknn, setDataknn] = useState([]);

  // State for query point, result, and distances

  const [result, setResult] = useState("");
  const [distances, setDistances] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  // Function to handle the KNN calculation on button click
  const handleKNN = async () => {
    const k = 1; // You can adjust the value of k as needed
    const { mostCommonClass, distances } = knn(
      dataknn,
      queryPoint,
      k,
      setDistances
    );
    setResult(`The query point belongs to class: ${mostCommonClass}`);
    console.log("distances :", distances);
    const ids = [];
    distances.forEach((item) => {
      ids.push(item.point.label);
    });

    // navigate("/result");
    console.log("ids :", ids);
    moveToResultPage(ids);
  };

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
      // This will handle cases where salary is not covered by the previous conditions
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
      // This will handle cases where salary is not covered by the previous conditions
      return 10;
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    location: "",
    salary: "",
    skill: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [queryPoint, setQueryPoint] = useState([0, 0, 0, 0]);

  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salary = getSalaryIdx(formData.salary);
    const exp = formData.exp;
    const cert = formData.cert;
    setQueryPoint([`${0}`, `${salary}`, `${exp}`, `${cert}`]);

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log("Join Data :", data);

        const arr2 = [];
        data.forEach((item) => {
          const salary = getSalaryIdx(item.salary);
          const distance = getDistance(item.distance);
          const name = item.name;
          const exp = item.exp;
          const cert = item.cert;
          const id = item.id;
          arr2.push({
            distance: distance,
            salary: salary,
            Name: name,
            exp: exp,
            cert: cert,
            id: id,
          });
        });
        console.log("SEEKER DATA :", arr2);
        setData(arr2);

        const final = [];
        arr2.forEach((seData) => {
          const salary = seData.salary;
          const distance = seData.distance;
          const name = seData.Name;
          const exp = seData.exp;
          const cert = seData.cert;
          const id = seData.id;
          final.push({ features: [distance, salary, exp, cert], label: id });
        });

        console.log("final DATA :", final);
        setDataknn(final);
        setData(final);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // Make a POST request to your backend API to save the form data to the database
    try {
      const response = await fetch("http://localhost:5000/minidbnew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log("Form submitted successfully:", data);

      const response2 = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data2 = await response2.json();
      // console.log("Form submitted successfully:", data2);
      const arr = [];
      data2.forEach((item) => {
        const distance = getDistance(item.distance);
        arr.push({ location: item.loca2, distance: distance });
      });
      console.log("distances :", arr);

      // Seeker table data
      const response3 = await fetch("http://localhost:5000/seeker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data3 = await response3.json();
      // console.log("Form submitted successfully:", data3);
      setRoutes(data2);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
     <div>
      <div className="formDetails">
        <form className="form" onSubmit={handleSubmit}>
          <div className="location">
            <label htmlFor="location">
              <strong>Location</strong>
            </label>
            <select
              id="cars"
              onChange={handleChange}
              name="location"
              value={formData.location}
              className="form-control rounded-4"
            >
              <option value="Aizawl">Aizawl</option>
              <option value="silchar">Silchar</option>
              <option value="Guwahati">Guwahati</option>
              <option value="kohima" selected>
                Kohima
              </option>
              <option value="Kolkata" selected>
                Kolkata
              </option>
              <option value="" selected>
                Choose a Location
              </option>
            </select>
          </div>

          <div className="salary">
            <label htmlFor="salary">
              {" "}
              <strong>Salary</strong>
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="form-control rounded-4"
            />
          </div>
          <div className="skill">
            <label htmlFor="skill">
              {" "}
              <strong>Skill </strong>
            </label>

            <select
              id="cars"
              onChange={handleChange}
              name="skill"
              value={formData.skill}
              className="form-control rounded-4"
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
          <div className="exp">
            <label htmlFor="exp">
              {" "}
              <strong>Experience</strong>
            </label>

            <select
              id="cars"
              onChange={handleChange}
              name="exp"
              value={formData.exp}
              className="form-control rounded-4"
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
          <div className="cert">
            <label htmlFor="cert">
              <strong>Certification</strong>
            </label>

            <select
              id="cars"
              onChange={handleChange}
              name="cert"
              value={formData.cert}
              className="form-control rounded-4"
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
            <br />
            <button type="submit" className="btn btn-success  rounded-4">
              <strong>Submit</strong>
            </button>
          </div>
        </form>
  <div className="point" >
               <div className="runcss">
                 <label>Query Point:</label>
                 <input
                   type="text"
            value={queryPoint.join(",")}
            className="form-control rounded-4"
                  />
                <div>
                       <p>{result}</p>
                </div>

                    <div class="runcss">
                      <button
                         onClick={handleKNN}
              className="btn   rounded-4"
                         >
                                Submit
                      </button>
                    <div>
                    
              {/* <p>Distances to all points in ascending order:</p> */}
              <ul>
                {distances.map((pair, index) => (
                  <li
                    key={index}
                  >{`Distance: ${pair.distance}, ID: ${pair.point.label}`}</li>
                ))}
              </ul>
            </div>
          </div>
          </div>
          <div >
          <BookingStatus />
          </div>
        </div>
      </div>
      <div >
          <Productcategory   />
        </div>
      </div>
  );
}

export default KNNApp;
