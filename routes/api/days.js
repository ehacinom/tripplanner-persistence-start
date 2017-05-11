let express = require('express');
let router = express.Router();
// var Day = require('../../models/day');
const { Place, Hotel, Restaurant, Activity, Day } = require('../../models')

// get all days
router.get('/', (req, res, next) => {
    Day
        .findAll({order: 'number'})
        .then(result => res.json(result))
        // .then(res.json.bind(res)) /// Response.json() needs correct `this`
        .catch(next);
})

// post one day
router.post('/', (req, res, next) => {
    Day
        .create({number: req.body.number})
        .then(result => res.json(result))
        .catch(next)
});

// get one day
router.get('/:id', (req, res, next) => {
    Day
        .findOne({where: {id: req.params.id}})
        .then(result => res.json(result))
        .catch(next)
})

// delete one day
router.delete('/:number', (req, res, next) => {
    Day
        .findOne({where: {number : req.params.number}})
        .then(result => result.destroy())
        .then(result => Day.findAll({
            where: {number: {$gt: req.params.number}}
        }))
        .then(result => result.map(row => row.decrement('number')))
        .then(result => Promise.all(result))
        .then(result => res.sendStatus(204))
        .catch(next);
})




// update by adding one attraction to one day
router.post('/:number/:type', (req, res, next) => {
    let dayPromise = Day.findOne({where: {number: req.params.number}});
    
    switch (req.params.type) {
        case 'hotel':
            Hotel
                .findOne({where: {id: req.body.id}})
                .then(result => dayPromise.then(day => day.setHotel(result)))
                .catch(next);
            break;
        case 'restaurant':
            Restaurant
                .findOne({where: {id: req.body.id}})
                .then(result => dayPromise.then(day => day.addRestaurant(result)))
                .catch(next);
            break;
        case 'activity':
            Activity
                .findOne({where: {id: req.body.id}})
                .then(result => dayPromise.then(day => day.addActivity(result)))
                .catch(next);
            break;
        default:
            console.error('bad type in days.js')
    }
    
    res.sendStatus(201);
})

// update by deleting an attraction to one day
router.put('/:number/:type', (req, res, next) => {
    let dayPromise = Day.findOne({where: {number: req.params.number}});
    
    switch (req.params.type) {
        case 'hotel':
            Hotel
                .findOne({where: {id: req.body.id}})
                .then(result => dayPromise.then(day => day.setHotel(null)))
                .catch(next);
            break;
        case 'restaurant':
            Restaurant
                .findOne({where: {id: req.body.id}})
                .then(result => dayPromise.then(day => day.removeRestaurant(result)))
                .catch(next);
            break;
        case 'activity':
            Activity
                .findOne({where: {id: req.body.id}})
                .then(result => dayPromise.then(day => day.removeActivity(result)))
                .catch(next);
            break;
        default:
            console.error('bad type in days.js')
    }
    
    res.sendStatus(204);
})




module.exports = router;