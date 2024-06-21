const express = require('express');
const router = express.Router();
const { signupSeeker, loginSeeker, login, signup} = require('../controllers/authController');

// const { validateLogin } = require('../middlewares/validation');

router.post('/signupSeeker', signupSeeker);
router.post('/loginSeeker', loginSeeker);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
