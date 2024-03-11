// import React, { useState } from 'react';
// import axios from 'axios';

// const RazorpayIntegration = () => {
//   const [orderId, setOrderId] = useState('');

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/razorpay');
//       setOrderId(response.data.id);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Pay with Razorpay</button>
//       {orderId && (
//         <div>
//           <p>Order ID: {orderId}</p>
//           {/* Add Razorpay Checkout component here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RazorpayIntegration;
