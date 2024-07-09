const express = require("express");
const mysql = require("mysql");
const Razorpay = require('razorpay');
const ethers = require('ethers');
const cors = require("cors");
const app = express();
const { check, validationResult, body } = require("express-validator");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads
const DataStorageABI = require('./DataStorageABI');
const authRoutes = require('./routes/authRoutes');
const seekerRoutes = require('./routes/seekerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const port = process.env.PORT || 5000;
require("dotenv").config();

// Ethereum setup
const contractAddress = "0xC5D50F51dC27121e9f448d1327963473824C9225";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// Razorpay setup
const razorpayInstance = new Razorpay({ 
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
const path = require("path");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use('/auth', authRoutes);
app.use('/seeker', seekerRoutes);
app.use('/review', reviewRoutes);
// app.use('/payment', paymentRoutes);
app.use('/booking', bookingRoutes);


// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
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

// update
app.put('/seeker/:email', upload.single('image'), (req, res) => {
  const { email } = req.params;
  const { name, location, salary, mobile, skill, exp, cert } = req.body;
  let image = req.file ? req.file.filename : null;

  // Construct the SQL query to update the seeker data
  let sql = 'UPDATE seeker SET name = ?, location = ?, salary = ?, mobile = ?, skill = ?, exp = ?, cert = ?';
  if (image) {
    sql += ', image = ?';
  }
  sql += ' WHERE email = ?';

  const values = [name, location, salary, mobile, skill, exp, cert];
  if (image) {
    values.push(image);
  }
  values.push(email);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Seeker updated successfully' });
  });
});
// get

app.get('/seeker/:email', (req, res) => {
  const { email } = req.params;
  const sql = 'SELECT * FROM seeker WHERE email = ?';
  // console.log("sql:",sql)
  console.log("email:",email)
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log("result:",result)
    if (result.length === 0) {
      return res.status(404).json({ error: 'Seeker not found' });
    }
   console.log("result:",result)
    res.json(result[0]);
  });
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

// Endpoint to handle submitting a review
app.post('/reviews', (req, res) => {
  const {seekerId, name, rating, comment } = req.body;
  
  // SQL query with placeholders
  const sql = 'INSERT INTO Reviews (seekerId, name, rating, comment) VALUES (?, ?, ?, ?)';
  
  // Execute the query with parameters
  db.query(sql, [seekerId, name, rating, comment], (error, results) => {
    if (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ error: 'Error submitting review' });
    } else {
      res.status(201).json({ message: 'Review submitted successfully' });
    }
  });
});





// Endpoint to retrieve all reviews
app.get('/reviews/:seekerId', (req, res) => {
  const { seekerId } = req.params;
  console.log("seekerId:", seekerId);

  const sql = `SELECT * FROM Reviews WHERE seekerId = ?`;
  console.log("SQL Query:", sql);

  db.query(sql, [seekerId], (error, results) => {
      if (error) {
          res.status(500).json({ error: 'Error retrieving reviews' });
      } else {
          res.status(200).json(results);
      }
  });
});

//payment
app.get('/seeker/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM seeker WHERE id = ?`;
  console.log("sql:",sql)
  console.log("paymentId:",id)
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log("result:",result)
    if (result.length === 0) {
      return res.status(404).json({ error: 'Seeker not found' });
    }
   console.log("result:",result)
    res.json(result[0]);
  });
});
// payment form user Data
app.get('/userlogin/:email', (req, res) => {
  const { email } = req.params;
  const sql = `SELECT * FROM userlogin WHERE email = ?`;
  console.log("sql:", sql);
  console.log("user email:", email);

  db.query(sql, [email], (err, result) => {
    if (err) { 
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log("result:", result);
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result[0]);
  });
});

  // booking
  app.post('/reqbooking', (req, res) => {
    const { email, userId, name, salary, comment, userEmail, seekerId } = req.body;
    const sql = 'INSERT INTO reqbooking (email, userId, name, salary, comment, userEmail, seekerId) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [email, userId, name, salary, comment, userEmail, seekerId], (error, results) => {
        if (error) {
            console.error('Database insertion error:', error);
            res.status(500).json({ error: 'Error submitting review' });
        } else {
            res.status(201).json({ message: 'Review submitted successfully' });
        }
    });
});


app.get('/reqbooking/:email', (req, res) => {
  const { email } = req.params; // Retrieve email from URL parameters
  const sql = 'SELECT userEmail, email, userId, name, salary, comment FROM reqbooking WHERE email = ?';
  db.query(sql, [email], (error, results) => {
      if (error) {
          console.error('Error fetching bookings:', error);
          res.status(500).json({ error: 'Error fetching bookings' });
      } else {
          res.status(200).json(results);
      }
  });
});

app.put('/reqbooking/:email', (req, res) => {
  const { name } = req.params;
  const { accepted } = req.body;
  const sql = 'UPDATE reqbooking SET accepted = ? WHERE name = ?';
  db.query(sql, [accepted, name], (error, results) => {
    if (error) {
      console.error('Error accepting job:', error);
      res.status(500).json({ error: 'Error accepting job' });
    } else {
      res.status(200).json({ message: 'Job accepted successfully' });
    }
  });
});
// Acceptbooking
app.post("/accept", (req, res) => {
  const {  userId, salary, email, name ,userEmail } = req.body;

  // Insert the data into the database
  const sql =
    "INSERT INTO accept( userId, salary, email, name, userEmail) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [ userId, salary, email, name, userEmail],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res
          .status(500)
          .json({ error: "Failed to store data in the database" });
      }
      console.log("Data inserted successfully");
      return res.status(200).json({ message: "Data inserted successfully" });
    }
  );
});
app.get('/accept/:UserEmail', (req, res) => {
  const { UserEmail } = req.params; // Retrieve email from URL parameters
  const sql = 'SELECT userEmail, email, userId, name, salary FROM accept WHERE UserEmail = ?';
  db.query(sql, [UserEmail], (error, results) => {
      if (error) {
          console.error('Error fetching bookings:', error);
          res.status(500).json({ error: 'Error fetching bookings' });
      } else {
          res.status(200).json(results);
      }
  });
});

// show details usering book seeker
app.get('/seeker/:email', (req, res) => {
  const { email } = req.params; // Retrieve email from URL parameters
  const sql = 'SELECT name, FROM seeker WHERE email = ?';
  db.query(sql, [email], (error, results) => {
      if (error) {
          console.error('Error fetching bookings:', error);
          res.status(500).json({ error: 'Error fetching bookings' });
      } else {
          res.status(200).json(results);
      }
  });
});

// delet booking
// Assuming you have already set up your Express app and database connection

app.delete('/accept/:salary', (req, res) => {
  const { salary } = req.params;
  const sql = 'DELETE FROM accept WHERE salary = ?';
  db.query(sql, [salary], (error, results) => {
      if (error) {
          console.error('Error deleting booking:', error);
          res.status(500).json({ error: 'Error deleting booking' });
      } else {
          res.status(200).json({ message: 'Booking deleted successfully' });
      }
  });
});

// payment
// DatastorageAPI.js

// Mock order endpoint
app.post('/order', async (req, res) => {
  const { sender, receiver, amount } = req.body;

  const paymentOptions = {
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
  };

  try {
    const razorpayOrder = await razorpayInstance.orders.create(paymentOptions);
    res.json({ message: 'success', order: razorpayOrder });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message || error });
  }
});


app.post('/payment-success', async (req, res) => {
  const { sender, receiver, amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

  try {
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(contractAddress, DataStorageABI, signer);

    await contract.storeData(sender, receiver, BigInt(amount), razorpayPaymentId, razorpayOrderId, razorpaySignature);

    res.json({ message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error while recording payment:', error); // Improved logging
    res.status(500).json({ error: 'An error occurred while recording payment', details: error.message });
  }
});

app.get('/transactions', async (req, res) => {
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
        salary: transaction[2].toString(),
        razorpayPaymentId: transaction[4],
        razorpayOrderId: transaction[5],
        razorpaySignature: transaction[6],
        timestamp: new Date(parseInt(transaction[3]._hex, 16) * 1000),
      });
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

app.get('/', (req, res) => {
  res.json('From Backend Side');
});

app.get('/reqbooking2', (req, res) => {
  res.json('This is the reqbooking endpoint');
});

app.listen(port, () => {
  console.log(`Connected to backend! ${port}`);
});
