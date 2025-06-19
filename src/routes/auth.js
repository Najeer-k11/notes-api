const express = require('express');
const router = express.Router();

let users = []; // In-memory user storage (do not use in production)

// SIGNUP
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User created successfully' });
});

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // In real app, return a JWT
    return res.json({ message: 'Login successful', token: 'mock-token' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
