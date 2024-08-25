const express = require('express');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername, getUserById } = require('../models/User');
const bcrypt = require('bcryptjs');
const {authenticateToken} = require("../middleware/auth")

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  getUserByUsername(username, (err, user) => {
    if (user) return res.status(400).json({ message: 'Username already exists' });

    createUser(username, password, (err) => {
      if (err) return res.status(500).json({ message: 'Failed to create user' });
      const token = jwt.sign({ id: this.lastId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  getUserByUsername(username, (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid username' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});


router.get('/me', authenticateToken, (req, res) => {
  getUserById(req.user.id, (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  });
});

module.exports = router;
