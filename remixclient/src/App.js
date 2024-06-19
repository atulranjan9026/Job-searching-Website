import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:7000/transactions');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch transactions');
        // }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const salary = parseInt(amount); // Parse amount to an integer
  
  //     const response = await fetch('http://localhost:7000/transaction', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sender,
  //         receiver,
  //         amount: salary, // Use the parsed integer value for salary
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to add transaction');
  //     }
  //     window.location.reload();
  //     // No need to fetch transactions again, just add the new transaction to the state
  //   //   const newTransaction = await response.json();
  //   //   setTransactions([...transactions, newTransaction]);
  //   //   setSender("");
  //   //   setReceiver("");
  //   //   setAmount(0);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const salary = parseInt(amount); // Parse amount to an integer
  
      // Check if the salary is within the valid range (2 <= salary <= 999)
      if (salary >= 2 && salary <= 999) {
        // Redirect the user to the paylink with the salary as the amount parameter
        window.location.href = `http://localhost:3002/pay?amount=${salary}&sender=${sender}&receiver=${receiver}`;
      } else {
        // Display an error message if the salary is not within the valid range
        setError("Salary must be between 2 and 999");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Transactions</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Sender:
          <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} />
        </label>
        <label>
          Receiver:
          <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Salary</th>
            <th>Timestamp</th> {/* Add Timestamp column */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction.jobProvider}</td>
              <td>{transaction.jobSeeker}</td>
              <td>{transaction.salary}</td>
              <td>{transaction.timestamp}</td> {/* Format timestamp */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
