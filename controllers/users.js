const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Community index
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index.ejs', { users });
  } catch (error) {
    res.redirect('/');
  }
});

// Show other user's tasks
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/show.ejs', { user });
  } catch (error) {
    res.redirect('/users');
  }
});

module.exports = router;