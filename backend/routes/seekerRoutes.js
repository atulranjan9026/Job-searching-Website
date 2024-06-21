const express = require('express');
const router = express.Router();
const { createSeeker, updateSeeker, getSeeker } = require('../controllers/seekerController');

// router.post('/', createSeeker);
// router.put('/:email', updateSeeker);
// router.get('/:email', getSeeker);

module.exports = router;
