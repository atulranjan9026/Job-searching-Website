const express = require('express');
const mysql = require('mysql');
const cors= require('cors')
const app = express();
require('dotenv').config();
app.use(cors())
const bodyParser = require('body-parser');
const path =require('path')

const port = process.env.PORT || 3000

//static files
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*",function(req,res){
  res.sendFile(path.resolve(__dirname,"./frontend/dist/index.html"))
});


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});




    // Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/minidbnew', (req, res) => {
    const { username, location, salary,skill } = req.body;
    
  
    const sql = 'INSERT INTO login (username, location, salary, skill) VALUES (?,?,?,?)';
    const values = [username, location, salary,skill];
  
    db.query(sql, values, (error, result) => {
      if (error) {
        // console.error('Error inserting into database:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        // console.log('Inserted into database:', result);
        res.status(200).json({ success: true, message: 'Form submitted successfully' });
      }
    });
  });



  app.post("/search", (req, res)=>{
    const {location } = req.body;
  
    const sql =`SELECT * FROM route WHERE loca1="${location}"`;
    console.log('sql :', sql)
    db.query(sql,(err, data) => {
      // console.log('sql data :', data)
      if (err) return res.json(err);
     return res.json(data);
    //  console.log(data)
    })
  })


  app.post("/seeker", (req, res)=>{
    const {skill} = req.body;
  
    const sql =`SELECT * FROM seeker WHERE skill="${skill}"`;
    console.log('sql :', sql)
    db.query(sql,(err, data) => {
      // console.log('sql data :', data)
      if (err) return res.json(err);
     return res.json(data);
    //  console.log(data)
    })
  })



  app.post("/data", async (req, res) => {
    try {
      const { skill, location } = req.body;
  
      const sql = `
        SELECT seeker.salary,route.distance ,seeker.name, seeker.exp, seeker.cert,seeker.id,seeker.image
        FROM seeker
        JOIN route ON seeker.location = route.loca2
        AND seeker.skill = "${skill}" AND route.loca1 = "${location}"`;
        db.query(sql,(err, data) => {
          // console.log('sql data :', data)
          if (err) return res.json(err);
         return res.json(data);
        //  console.log(data)
        })

    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  app.post('/resultData', (req, res) => {
    const { id, ids } = req.body;
  
    // Construct and execute the SQL query
    let sql =`SELECT * FROM seeker WHERE id IN (`;


    ids.forEach((userId)=>(
      sql+=userId+","
    ))

    sql = sql.slice(0, -1);


    sql+=")"

    console.log('sql :', sql)

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result); 
      }
    });
  });

  app.get('/',(req,res)=>{
    return res.json("From Backend Side")
  })
  
  app.listen(port ,()=>{
      console.log("Connected to backend!")
  })