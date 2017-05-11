let express = require('express');
let router = express.Router();
var Activity = require('../../models/activity');


router.get('/', function(req, res, next){
  Activity.findAll()
    .then(function(activities){
      res.json(activities);
    })
    .catch(next);
});

module.exports = router;