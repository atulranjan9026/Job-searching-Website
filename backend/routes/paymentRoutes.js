const express = require('express');
const router = express.Router();
const { createOrder, paymentSuccess, getTransactions } = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.post('/payment-success', paymentSuccess);
router.get('/transactions', getTransactions);

module.exports = router;
