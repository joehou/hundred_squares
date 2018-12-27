var express = require('express');
var router = express.Router();

const User = require('../../models/user')

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
  User.findOne( {username:req.params.id}, (err, user) => {
    if (err){
      res.send(err)
    }
    res.json(user)
  })
})

module.exports = router;
