let express = require('express');
let router = express.Router();

const hotelRoutes = require('./hotels');
const restaurantRoutes = require('./restaurants');
const activityRoutes = require('./activities');
const dayRoutes = require('./days');

router.use('/hotels', hotelRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/activities', activityRoutes);
router.use('/days', dayRoutes);

module.exports = router;
