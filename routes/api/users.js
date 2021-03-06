const express = require('express')
const User = require('../../models/user')
const Grid = require('../../models/grid')

var router = express.Router();
var gridRouter = express.Router({mergeParams: true})
var eventRouter = express.Router({mergeParams: true})

// attach itemRouter as middle ware
router.use('/:id/grids', gridRouter)
gridRouter.use('/:gridId/events',eventRouter)

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

//add events crud to grid
eventRouter.get('/', async( req,res,next )=>{
  User.findOne( {username:req.params.id},'grids').populate({path:'grids', model: Grid}).exec( (err,user) =>{
  if (err){
    return next(err)
  }
  if (!user ){
    res.send("user not found")
  }else if(user.grids.length ==0){
    res.send("user grids not found")
  }else{
      res.status(200)
      .json(user.grids[0].events)
    }
  })
})

// post api/users/:id/grids/:grid_id/events/"
eventRouter.post('/', async( req,res,next )=>{
  User.findOne( {username:req.params.id},'grids').populate({path:'grids', model: Grid}).exec( async(err,user) =>{
  if (err){
    return next(err)
  }
  if (!user ){
    res.send("user not found")
  }else if(user.grids.length ==0){
    res.send("user grids not found")
  }else{
        var event = user.grids[0].events.create(req.body)
        await user.grids[0].events.push(event)
        await user.grids[0].save()
        res.status(200).json(event)
        }
        })
})
// put api/users/:id/grids/:grid_id/events/:event_id"
eventRouter.put('/:eventId', async( req,res,next )=>{
  User.findOne( {username:req.params.id},'grids').populate({path:'grids', model: Grid}).exec( async(err,user) =>{
  if (err){
    return next(err)
  }
  if (!user ){
    res.send("user not found")
  }else if(user.grids.length ==0){
    res.send("user grids not found")
  }else{
      var event = user.grids[0].events.find( (e) =>{return e._id== req.params.eventId} )
      if(!event){
        res.status(404).json('event not found')
      }else{
        event.eventName= req.body.eventName
        event.endBlock= req.body.endBlock
        event.eventColor= req.body.eventColor
        event.eventFontColor= req.body.eventFontColor
        event.startBlock= req.body.startBlock
        await user.grids[0].save()
        res.status(200)
        .json(event)
    }}
  })
})

//delete event from user grid
eventRouter.delete('/:eventId',async( req,res,next )=>{
User.findOne({username:req.params.id},'grids').populate({path:'grids', model: Grid}).exec(  async(err,user)=>{
        if(err){
        return next(err)
        }
    if (!user || user.grids.length === 0){
        res.send("user or grid not found")
        }else{
            var event = user.grids[0].events.find( (e) =>{return e._id== req.params.eventId} )
            await event.remove()
            await user.grids[0].save()
            var eventslist = user.grids[0].events
            eventslist = closeGaps(eventslist)
            await user.grids[0].save()
            res.status(200).json(event)
        }
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

const closeGaps = (eventsArray)=>{
    var gapSize= eventsArray[0].startBlock
    return eventsArray.map( (event, i, arr) => {
        if ( gapSize ===0 &&  i>0 && ( (event.startBlock-arr[i-1].endBlock) >= 1 )  ) gapSize=(event.startBlock-arr[i-1].endBlock) - 1
        if (gapSize>0) event= {...event, startBlock: event.startBlock -= gapSize ,endBlock: event.endBlock -= gapSize}
        return event
    })
}

module.exports = router;
