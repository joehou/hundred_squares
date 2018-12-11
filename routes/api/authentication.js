const appConfig = require('../../config.js');
const crypto = require('crypto');
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../../models/user.js')

const router = express.Router()

mongoose.Promise=global.Promise

// POST to /login
router.post('/login', async (req,res) => {
  const query = User.findOne({ email: req.body.email })
  const foundUser = await query.exec()
  // if the user exists they'll have an username so lets add that to our body and authenticate with passport
  if (foundUser) { req.body.username = foundUser.username } 
  passport.authenticate('local')(req,res, ()=> {
    if (req.user) {
      return res.send(JSON.stringify(req.user)) 
    }
    return res.send(JSON.stringify({ error: 'Thrre was an error loggin in'}))
  })
})

// GET to /logout
router.get('/logout', (req,res) => {
  req.logout()
  res.send(JSON.stringify(req.user))
})

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
    if (err){
      return res.status(400).send(JSON.stringify({ error: err}))
    }
    return res.status(201).send(JSON.stringify(user))
  })
});

module.exports = router 
