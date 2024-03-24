const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User.js');
const e = require('express');
// const bcrypt = require('bcryptjs'); // Uncomment if using bcrypt for hashing passwords
// auth functions public and private
function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    // go to login page
    return res.status(401).send('Access denied');

  }
  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
}

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
    // save the user's id in the token
    const token = jwt.sign({ id: user
      ._id }, 'secret', { expiresIn: '1h' });
    // save the token in the session cookie
    res.cookie('token', token, { httpOnly: true });
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

// Get all users
router.get('/users', async (req,auth, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user by id
router.get('/users/:id', async (req, auth, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user by id
router.put('/users/:id', async (req, auth, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    else {
      user.username = username;
      user.email = email;
      await user.save();
      res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete user by id
router.delete('/users/:id', async (req, auth, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.remove();
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user by email
router.get('/users/email/:email', async (req, auth, res) => {
  try {
    const user = await
      User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user by email
router.put('/users/email/:email', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await
      User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    else {
      user.username = username;
      user.email = email;
      await user.save();
      res.json(user);
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete user by email
router.delete('/users/email/:email', async (req, res) => {
  try {
    const user = await
      User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.remove();
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;


