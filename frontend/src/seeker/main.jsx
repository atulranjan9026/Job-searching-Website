import React from "react";
import { Link, useNavigate } from "react-router-dom"; 

const main = () => {
  return (
      <div>
        <div>
       <div className="formDiv">
        <Link
            to="/signupSeeker"
            className="btn btn-success w-50 rounded-4" >
            <strong>SEEKER</strong>
          </Link>
        </div>
        <div className="formDiv">
        <Link
            to="/login"
            className="btn btn-default border w-50 bg-light rounded-4 text-decoration-none">
            <strong>CUSTOMER</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default main;
