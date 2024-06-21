// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const db = require('./config/db');
// const provider = require('./config/ethereum');
// const razorpayInstance = require('./config/razorpay');

const authRoutes = require('./routes/authRoutes');
const seekerRoutes = require('./routes/seekerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/auth', authRoutes);
app.use('/seeker', seekerRoutes);
app.use('/review', reviewRoutes);
app.use('/payment', paymentRoutes);
app.use('/booking', bookingRoutes);




