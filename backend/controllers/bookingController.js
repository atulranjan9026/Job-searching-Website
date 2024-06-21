const db = require('../config/db');

exports.book = (req, res) => {
  const { seekerId, date, time, duration } = req.body;
  const sql = 'INSERT INTO Bookings (seekerId, date, time, duration) VALUES (?, ?, ?, ?)';

  db.query(sql, [seekerId, date, time, duration], (error) => {
    if (error) {
      console.error('Error booking:', error);
      res.status(500).json({ error: 'Error booking' });
    } else {
      res.status(201).json({ message: 'Booking successful' });
    }
  });
};

exports.getBookings = (req, res) => {
  const { seekerId } = req.params;
  const sql = 'SELECT * FROM Bookings WHERE seekerId = ?';

  db.query(sql, [seekerId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving bookings' });
    } else {
      res.status(200).json(results);
    }
  });
};
