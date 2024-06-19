require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const { ethers } = require('ethers');
const DataStorageABI = require('./DataStorageABI');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Ethereum setup
const contractAddress = "0xC5D50F51dC27121e9f448d1327963473824C9225";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// Razorpay setup
const razorpayInstance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

// Endpoint to fetch transactions from blockchain
app.get('/transactions', async (req, res) => {
  try {
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      const signer = provider.getSigner(account);
      const contract = new ethers.Contract(contractAddress, DataStorageABI, signer);

      const count = await contract.getTransactionsCount({ from: account });
      console.log("Transactions Count from contract:", count.toString());

      const transactions = [];
      for (let i = 0; i < count; i++) {
          const transaction = await contract.getTransaction(i);
          transactions.push({
              jobProvider: transaction[0],
              jobSeeker: transaction[1],
              salary: transaction[2].toString(),
              razorpayPaymentId: transaction[4],
              razorpayOrderId: transaction[5],
              razorpaySignature: transaction[6],
              timestamp: new Date(parseInt(transaction[3]._hex, 16) * 1000)
          });
      }

      console.log(transactions);
      res.json(transactions);
  } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "An error occurred while fetching transactions" });
  }
});

// Endpoint to create Razorpay order
app.post('/order', async (request, response) => {
    const { sender, receiver, amount } = request.body;

    if (!sender || !receiver || !amount) {
        return response.status(400).json({ message: 'Please provide sender, receiver, and amount' });
    }

    const paymentOptions = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    };

    try {
        const razorpayOrder = await razorpayInstance.orders.create(paymentOptions);
        return response.json({ 
            message: 'success', 
            order: razorpayOrder 
        });
    } catch (error) {
        return response.status(500).json({ message: 'Something went wrong', error });
    }
});

// Endpoint to handle Razorpay payment success
app.post('/payment-success', async (request, response) => {
  const { sender, receiver, amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = request.body;

  try {
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      const signer = provider.getSigner(account);
      const contract = new ethers.Contract(contractAddress, DataStorageABI, signer);

      // Store all transaction details on the blockchain
      await contract.storeData(sender, receiver, BigInt(amount), razorpayPaymentId, razorpayOrderId, razorpaySignature);

      response.json({ message: 'Payment recorded successfully' });
  } catch (error) {
      console.error("Error recording payment:", error);
      response.status(500).json({ error: "An error occurred while recording payment" });
  }
});


app.listen(PORT, () => console.log(`Express server started at PORT:${PORT}`));
