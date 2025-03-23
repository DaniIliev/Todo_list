const db = require('../db');


const findOneByID = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return resolve(null);

      resolve(results[0]);
    });
  });
};

module.exports = {findOneByID};