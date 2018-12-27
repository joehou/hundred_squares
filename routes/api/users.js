var express = require('express');
var router = express.Router();

const User = require('../../models/user')
const Grid = require('../../models/grid')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find( (err, users) => {
    if (err){
      res.send(err)      
    }
    res.json(users)
  })
});

router.get('/:id', async( req, res, next) =>{
  User.findOne( {username:req.params.id}).populate({path:'grids', model: Grid}).exec( (err,user) =>{
    if(err){
      res.send(err)
    }
    res.send(user)
  })
})

module.exports = router;
