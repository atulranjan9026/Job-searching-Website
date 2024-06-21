const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');

router.post('/submit', submitReview);
router.get('/:seekerId', getReviews);

module.exports = router;
