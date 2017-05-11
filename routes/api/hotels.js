let express = require('express');
let router = express.Router();
var Hotel = require('../../models/hotel');


router.get('/', function(req, res, next){
  Hotel.findAll()
    .then(function(hotels){
      res.json(hotels);
    })
    .catch(next);
});


module.exports = router;