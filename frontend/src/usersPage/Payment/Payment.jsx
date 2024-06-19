import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useParams , useNavigate   } from 'react-router-dom';
import './Payment.css';

const Payment = ({ onPaymentSuccess }) => {
  const navigate = useNavigate(); // Initialize useHistory hook
  const { id, name, userName ,salary } = useParams();
  const [sender, setSender] = useState(name);
  const [receiver, setReceiver] = useState(userName);
  const [amount, setAmount] = useState(id);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.toString());
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/order', {
        sender,
        receiver,
        amount,
      });

      if (response.data.message !== 'success') {
        alert('Error creating order');
        return;
      }

      const { order } = response.data;

      const razorPayOptions = {
        key: 'rzp_test_rjKd6EGg7Yk1wP',
        amount: amount * 100,
        currency: 'INR',
        name: 'Buy Shirt',
        description: 'Paying for testing',
        order_id: order.id,

        handler: async (response) => {
          // const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = response;
          const razorpayPaymentId = response.razorpay_payment_id;
          const razorpayOrderId = response.razorpay_order_id;
          const razorpaySignature = response.razorpay_signature;
          try {
            const paymentResponse = await axios.post('http://localhost:5000/payment-success', {
              sender,
              receiver,
              amount,
              razorpayPaymentId,
              razorpayOrderId,
              razorpaySignature,
            });
            
            console.log('Payment Response:', paymentResponse.data); // Log the response for debugging

            if (paymentResponse.data.message === 'Payment recorded successfully') {
              // onPaymentSuccess(paymentResponse.data.payments);
              console.log("Success");
              navigate(`/reviews/${name}/${userName}/${id}/${salary}`);
            } else {
              alert('Error recording payment');
            }
          } catch (error) {
            console.error('Error recording payment:', error); // Improved error logging
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your@example.com',
          contact: '1234567890',
        },
        notes: {
          address: 'Your Address',
        },
        theme: {
          color: '#3399cc',
        },
      };

      if (window.Razorpay) {
        const razorpayInstance = new window.Razorpay(razorPayOptions);
        razorpayInstance.open();
      } else {
        alert('Razorpay SDK failed to load. Are you online?');
      }
    } catch (error) {
      console.error('Error processing payment:', error); // Improved error logging
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Payment Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            disabled
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Sender"
            required
          />
          <input
            disabled
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Receiver"
            required
          />
          <input
            disabled
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (in INR)"
            required
          />
          <button type="submit">Pay</button>
        </form>
      </div>
      {/* <h2>Transaction History</h2>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Job Provider</th>
            <th>Job Seeker</th>
            <th>Salary</th>
            <th>Razorpay Payment ID</th>
            <th>Razorpay Order ID</th>
            <th>Razorpay Signature</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
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
      </table> */}
    </div>
  );
};

export default Payment;
