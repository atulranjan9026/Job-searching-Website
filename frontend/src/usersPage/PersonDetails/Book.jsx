import React from 'react'
import "./Book.css"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Book = () => {
    let { id } = useParams();
  return (
    <div className='book'>
        <div>
            <h1>Book</h1>
        </div>
        <div className="payment">
              {/* <h4 className="tourName">Total Payable: {user.salary}</h4> */}
              <Link to="/Payment" className="btn btn-success w-100 rounded-4">
                Payment
              </Link>
              <Link
                to={`/Reviews/${id}`}
                className="btn btn-success w-100 m-4 rounded-4"
              >
                Reviews
              </Link>
            </div>
    </div>
  )
}

export default Book