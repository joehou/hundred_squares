var express = require('express');
var router = express.Router();

const User = require('../../models/user')

/* GET users listing. */
router.get('/list', function(req, res, next) {
  User.find( (err, users) => {
    if (err){
      res.send(err)      
    }
    res.json(users)
  })
});

module.exports = router;
