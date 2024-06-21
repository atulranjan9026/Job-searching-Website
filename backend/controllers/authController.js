const { validationResult } = require("express-validator");
const db = require('../config/db');

// Seeker Singnup
exports.signupSeeker = (req, res) => {
  if (req.body && req.body.name && req.body.email && req.body.password) {
    const { name, email, password } = req.body;
    const sql = `INSERT INTO seeker (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, password];
    console.log(values);
    db.query(sql, values, (error, result) => {
      if (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      } else {
        res.status(200).json({ success: true, message: "Signup successful" });
      }
    });
  }
};

//Seeker Login
exports.loginSeeker = (req, res) => {
  const sql = "SELECT * FROM seeker WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    } else {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        return res.json("Success");
      } else {
        return res.json("Faile");
      }
    }
  });
};

// User Login
exports.login = (req, res) => {
  const sql = "SELECT * FROM userlogin WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    } else {
      if (err) {
        return res.json("Error");
      }
      if (data.length > 0) {
        return res.json("Success");
      } else {
        return res.json("Faile");
      }
    }
  });
};

// user Signup
exports.signup = (req, res) => {
    if (req.body && req.body.name && req.body.email && req.body.password) {
      const { name, email, password } = req.body;
      const sql = `INSERT INTO userlogin (name, email, password) VALUES (?, ?, ?)`;
      const values = [name, email, password];
      console.log(values);
      db.query(sql, values, (error, result) => {
        if (error) {
          console.error("Signup error:", error.message);
          res.status(500).json({ success: false, error: "Internal Server Error" });
        } else {
          res.status(200).json({ success: true, message: "Signup successful" });
        }
      });
    }
  };