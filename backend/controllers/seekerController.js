const db = require('../config/db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.createSeeker = (req, res) => {
  const { name, mobile, location, salary, email, skill, exp, cert, image } = req.body;
  const sql = 'INSERT INTO seeker (name, location, salary , mobile , email ,skill,exp ,cert,image) VALUES (?, ?, ?,?, ?, ?, ?, ?,?)';
  const values = [name, location, salary, mobile, email, skill, exp, cert, image];

  db.query(sql, values, (error) => {
    if (error) {
      console.error("Signup error:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } else {
      res.status(200).json({ success: true, message: "Signup successful" });
    }
  });
};

// exports.updateSeeker = upload.single('image'), (req, res) => {
//   const { email } = req.params;
//   const { name, location, salary, mobile, skill, exp, cert } = req.body;
//   let image = req.file ? req.file.filename : null;

//   let sql = 'UPDATE seeker SET name = ?, location = ?, salary = ?, mobile = ?, skill = ?, exp = ?, cert = ?';
//   if (image) {
//     sql += ', image = ?';
//   }
//   sql += ' WHERE email = ?';

//   const values = [name, location, salary, mobile, skill, exp, cert];
//   if (image) {
//     values.push(image);
//   }
//   values.push(email);

//   db.query(sql, values, (err) => {
//     if (err) {
//       console.error('Error executing MySQL query:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     res.json({ message: 'Seeker updated successfully' });
//   });
// };

exports.getSeeker = (req, res) => {
  const { email } = req.params;
  const sql = 'SELECT * FROM seeker WHERE email = ?';

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Seeker not found' });
    }
    res.json(result[0]);
  });
};
