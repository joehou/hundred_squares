const appConfig = require('../../config.js');
const crypto = require('crypto');
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../../models/user.js')

const router = express.Router()

mongoose.Promise=global.Promise

// POST to /register
router.post('/register', (req, res) => {
  // Create a user object to save, using values from incoming JSON
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, (err,user) => {
    console.log('register from api using mongo')
    if (err){
      return res.send(JSON.stringify({ error: err}))
    }
    return res.send(JSON.stringify(user))
  })
});

module.exports = router 
