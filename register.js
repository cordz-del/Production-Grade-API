// src/auth/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Mongoose model
const router = express.Router();

router.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.trim() }] });
    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email or username already exists',
        field: existingUser.email === email.toLowerCase() ? 'email' : 'username'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      email: email.toLowerCase(),
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

module.exports = router;
