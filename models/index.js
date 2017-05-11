var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');
var Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.hasOne(Hotel);
Day.belongsToMany(Restaurant, {through: "DayRestaurant"});
Day.belongsToMany(Activity, {through: "DayActivity"});

module.exports = { db, Place, Hotel, Restaurant, Activity, Day };
