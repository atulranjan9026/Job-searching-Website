const { check } = require('express-validator');

exports.validateLogin = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password length must be 8-10 characters').isLength({ min: 8, max: 10 }),
];
