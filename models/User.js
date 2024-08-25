const db = require('../database');
const bcrypt = require('bcryptjs');

const createUser = (username, password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, username });
      }
    );
  });
};

const getUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};

const getUserById = (id, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], callback);
};

module.exports = { createUser, getUserByUsername, getUserById };
