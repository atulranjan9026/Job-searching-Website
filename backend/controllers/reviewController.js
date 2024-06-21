const db = require('../config/db');

exports.submitReview = (req, res) => {
  const { seekerId, name, rating, comment } = req.body;
  const sql = 'INSERT INTO Reviews (seekerId, name, rating, comment) VALUES (?, ?, ?, ?)';

  db.query(sql, [seekerId, name, rating, comment], (error) => {
    if (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ error: 'Error submitting review' });
    } else {
      res.status(201).json({ message: 'Review submitted successfully' });
    }
  });
};

exports.getReviews = (req, res) => {
  const { seekerId } = req.params;
  const sql = 'SELECT * FROM Reviews WHERE seekerId = ?';

  db.query(sql, [seekerId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving reviews' });
    } else {
      res.status(200).json(results);
    }
  });
};
