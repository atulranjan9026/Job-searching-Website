const provider = require('../config/ethereum');
const razorpayInstance = require('../config/razorpay');
const { ethers } = require('ethers');
const DataStorageABI = require('../DataStorageABI');

exports.createOrder = async (req, res) => {
  const { sender, receiver, amount } = req.body;
  const paymentOptions = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
  };

  try {
    const razorpayOrder = await razorpayInstance.orders.create(paymentOptions);
    res.json({ message: 'success', order: razorpayOrder });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

exports.paymentSuccess = async (req, res) => {
  const { sender, receiver, amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

  try {
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(contractAddress, DataStorageABI, signer);

    await contract.storeData(sender, receiver, BigInt(amount), razorpayPaymentId, razorpayOrderId, razorpaySignature);

    res.json({ message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error while recording payment:', error);
    res.status(500).json({ error: 'An error occurred while recording payment', details: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(contractAddress, DataStorageABI, signer);

    const count = await contract.getTransactionsCount({ from: account });
    const transactions = [];
    for (let i = 0; i < count; i++) {
      const transaction = await contract.getTransaction(i);
      transactions.push({
        jobProvider: transaction[0],
        jobSeeker: transaction[1],
        amount: transaction[2].toString(),
        paymentId: transaction[3],
        orderId: transaction[4],
        signature: transaction[5],
      });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error while getting transactions:', error);
    res.status(500).json({ error: 'An error occurred while getting transactions', details: error.message });
  }
};
