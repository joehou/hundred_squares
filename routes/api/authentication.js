const appConfig = require('../../config.js');
const crypto = require('crypto');
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../../models/user.js')
const Grid = require('../../models/grid')

var router = express.Router()

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
    return res.send(JSON.stringify({ error: 'There was an error logging in'}))
  })
})

router.get('/',async(req,res,next)=>{
    res.send('root of auth')
})

// GET to /checksession
router.get('/checksession', (req, res) => {
 if (req.user) {
   return res.send(JSON.stringify(req.user));
 }
 return res.send(JSON.stringify({}));
});

// GET to /logout
router.get('/logout', (req,res) => {
    req.session.destroy( (err)=> {
        if (err) return next (err)
        req.logout()
        res.sendStatus(200)
    })
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
    //If the request does not come with a blank grid we are going to create a "Starter Grid" and add it to the user
    var grid = new Grid()
    grid.save().then( _ => {
      user.addGrid(grid._id)
      return res.status(201).send(JSON.stringify(user))
    })
    //else save the grid from the request and add to user
  })
})

module.exports = router
