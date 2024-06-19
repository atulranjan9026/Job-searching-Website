import React, { useEffect, useState } from "react";
import axios from 'axios';
import { NavLink, Link, useNavigate, Router, useNavigation } from "react-router-dom";
import "./result.css"
import  Form  from  "./Form";
import { useParams } from "react-router-dom";


function formatImage(buffer) {
  return `data:image/png;base64,${btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )}`;
}

const Result = ({ data }) => {
  const [userData, setUserData] = useState([]);
  let { UserEmail } = useParams();
  console.log(UserEmail)

  console.log("data", data)

  const router = useNavigate();
  
  const navigateToDetailsPage = (id) => {
    setUserData("")
    router(`/personDetails/${id}/${UserEmail}`);
    // navigate(`/personDetails/${id}/${email}`);

  }

  useEffect(() => {
    const fetchData = async () => {
      if (!data) return;
      try {
        const mostCommonClass = "your_most_common_class";
        const ids = data;

        const responseId = await axios.post("http://localhost:5000/resultData", {
          id: mostCommonClass,
          ids
        });

        const dataId = responseId.data;
        console.log("resultData :", dataId[0], dataId[0].name);

        setUserData(dataId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="result">
      <div className="cards">
        {userData.map((user) => (
          <div key={user.name}>
            <div className="card">
              <img src={formatImage(user.image?.data)} className="image" alt="img" />
              <div className="tourDetails">
                <h4 className="tourPrice">ID: {user.id}</h4>
                <h4 className="tourPrice">Name: {user.name}</h4>
                <h4 className="tourName">Salary: {user.salary}</h4>
                <h4 className="tourName">Exp: {user.exp}</h4>
                <h4 className="tourName">Cert: {user.cert}</h4>
              </div>
              <button onClick={() => navigateToDetailsPage(user.id)} className="btn btn-success w-100 rounded-4 ">
                <strong>BOOK </strong>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
