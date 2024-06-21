const express = require('express');
const router = express.Router();
const { book, getBookings } = require('../controllers/bookingController');

router.post('/book', book);
router.get('/:seekerId', getBookings);

module.exports = router;
