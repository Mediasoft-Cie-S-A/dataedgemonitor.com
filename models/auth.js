const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.js');
// const bcrypt = require('bcryptjs'); // Uncomment if using bcrypt for hashing passwords

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // In a real app, compare hashed passwords
    // const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
    const isMatch = req.body.password === user.passwordHash;

    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    user.lastLogin = new Date();
    await user.save();

    // Send back a token or a success message in a real app
    res.send('Login successful');
  } catch (error) {
    res.status(500).send(error.toString());
  }
});




// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      passwordHash
    });

    await user.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add login, logout, and password recovery routes

module.exports = router;


