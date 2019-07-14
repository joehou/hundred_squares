const express = require('express')
const User = require('../../models/user')
const Grid = require('../../models/grid')

var router = express.Router();
var gridRouter = express.Router({mergeParams: true})

// attach itemRouter as middle ware

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find( (err, users) => {
    if (err){
    res.send(err)
    }
    res.json(users)
  })
})

// Get user info
router.get('/:id', async( req, res, next) =>{
  console.log(`the logged in users is ${req.user}`)
  User.findOne( {username:req.params.id}).populate({path:'grids', model: Grid}).exec( (err,user) =>{
    if(err){
      res.send(err)
    }
    res.send(user)
  })
})

//get user grid
gridRouter.get('/', async( req,res,next) => {
  res.status(200)
  .send('at root of grid')
})

// get users most recent grid
gridRouter.get('/recent', async( req,res,next) => {
  User.findOne( {username:req.params.id},'grids').populate({path:'grids', model: Grid}).exec( (err,user) =>{
  console.log('getting recent')
  if (err){
    console.log(err)
    return next(err)
  }
  if (!user || user.grids.length === 0){
    console.log('not found user in recent')
    res.send("user not found")
  }else{
    res.status(200)
    .json(user.grids[0])
    }
  })
})

//get user's grid by ID
gridRouter.get('/:gridId', async( req,res,next) => {
  console.log('in id')
  User.findOne( {username:req.params.id},'grids').populate({path:'grids', model: Grid}).exec( (err,user) =>{
  if (err){
    return next(err)
  }
  console.log(user)
  if (!user || user.grids.length ==0){
    console.log('not found user in girdi')
    res.send("user not found")
  }else{
      res.status(200)
      .json(user.grids[0])
    }
  })
})

//add event to grid


router.use('/:id/grids', gridRouter)

module.exports = router;
