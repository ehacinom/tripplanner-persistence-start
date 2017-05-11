let express = require('express');
let router = express.Router();
var Restaurant = require('../../models/restaurant');

router.get('/', function(req, res, next){
  Restaurant.findAll()
    .then(function(restaurants){
      res.json(restaurants);
    })
    .catch(next);
});


module.exports = router;