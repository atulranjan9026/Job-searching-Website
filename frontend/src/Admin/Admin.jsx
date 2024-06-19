import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/transactions");
        setTransactions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <h2>Transactions</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Transaction Number</th>
            <th>Job Provider</th>
            <th>Job Seeker</th>
            <th>Salary</th>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Signature</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction.jobProvider}</td>
              <td>{transaction.jobSeeker}</td>
              <td>{transaction.salary}</td>
              <td>{transaction.razorpayPaymentId}</td>
              <td>{transaction.razorpayOrderId}</td>
              <td>{transaction.razorpaySignature}</td>
              <td>{new Date(transaction.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
