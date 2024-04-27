const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const { check, validationResult, body } = require("express-validator");

require("dotenv").config();
app.use(cors());
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./frontend/dist/index.html"));
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//signup  seeker
app.post("/minidbnew", (req, res) => {
  if (req.body && req.body.name && req.body.email && req.body.password) {
    const { name, email, password } = req.body;
    const sql = `INSERT INTO seekerlogin (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, password];
    console.log(values);
    db.query(sql, values, (error, result) => {
      if (error) {
        console.error("Signup error:", error.message);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      } else {
        res.status(200).json({ success: true, message: "Signup successful" });
      }
    });
  }
});

// data seeker

app.post("/ew", (req, res) => {
  const { name, mobile, location, salary, email, skill, exp, cert, image } =
    req.body;
  const sql = `INSERT INTO seeker (name, location, salary , mobile , email ,skill,exp ,cert,image) VALUES (?, ?, ?,?, ?, ?, ?, ?,?)`;

  const values = [
    name,
    location,
    salary,
    mobile,
    email,
    skill,
    exp,
    cert,
    image,
  ];
  console.log(values);
  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Signup error:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } else {
      res.status(200).json({ success: true, message: "Signup successful" });
    }
  });
});

// login seeker
app.post(
  "/seekerlogin",
  [
    check("email", "Emaill length error")
      .isEmail()
      .isLength({ min: 1, max: 30 }),
    check("password", "password length 8-10").isLength({ min: 1, max: 10 }),
  ],
  (req, res) => {
    const sql = "SELECT * FROM seekerlogin WHERE email = ? AND password = ?";

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
  }
);

//login  user
app.post("/minidbnew", (req, res) => {
  if (req.body && req.body.name && req.body.email && req.body.password) {
    const { name, email, password } = req.body;
    const sql = `INSERT INTO userlogin (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, password];
    console.log(values);
    db.query(sql, values, (error, result) => {
      if (error) {
        console.error("Signup error:", error.message);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      } else {
        res.status(200).json({ success: true, message: "Signup successful" });
      }
    });
  }
});

//login  validations

app.post(
  "/userlogin",
  [
    check("email", "Emaill length error")
      .isEmail()
      .isLength({ min: 1, max: 30 }),
    check("password", "password length 8-10").isLength({ min: 1, max: 10 }),
  ],
  (req, res) => {
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
  }
);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.post("/search", (req, res) => {
  const { location } = req.body;

  const sql = `SELECT * FROM route WHERE loca1="${location}"`;
  console.log("sql :", sql);
  db.query(sql, (err, data) => {
    // console.log('sql data :', data)
    if (err) return res.json(err);
    return res.json(data);
    //  console.log(data)
  });
});

app.post("/seeker", (req, res) => {
  const { skill } = req.body;

  const sql = `SELECT * FROM seeker WHERE skill="${skill}"`;
  console.log("sql :", sql);
  db.query(sql, (err, data) => {
    // console.log('sql data :', data)
    if (err) return res.json(err);
    return res.json(data);
    //  console.log(data)
  });
});

app.post("/data", async (req, res) => {
  try {
    const { skill, location } = req.body;

    const sql = `
        SELECT seeker.salary,route.distance ,seeker.name, seeker.exp, seeker.cert,seeker.id,seeker.image
        FROM seeker
        JOIN route ON seeker.location = route.loca2
        AND seeker.skill = "${skill}" AND route.loca1 = "${location}"`;
    db.query(sql, (err, data) => {
      // console.log('sql data :', data)
      if (err) return res.json(err);
      return res.json(data);
      //  console.log(data)
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/resultData", (req, res) => {
  const { id, ids } = req.body;
  // Construct and execute the SQL query
  let sql = `SELECT * FROM seeker WHERE id IN (`;

  ids.forEach((userId) => (sql += userId + ","));
  sql = sql.slice(0, -1);
  sql += ")";
  console.log("sql :", sql);

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

app.post("/Text", (req, res) => {
  const {names} = req.body;
  let sql =
    `SELECT name,id,
    salary,
    mobile,
    email,
    exp,
    cert,
    image, levenshtein_search("${names}", name) AS similarity FROM seeker ORDER BY similarity`;
    console.log("sql :", sql);
  db.query(sql, (err, data) => {
    // console.log('sql data :', data)
    if (err) return res.json(err);
    return res.json(data);
    //  console.log(data)
  });
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

app.listen(port, () => {
  console.log("Connected to backend!");
});
