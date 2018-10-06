const express = require('express');
//const router = express.Router();
const router = require('express').Router();

const Users = require('../controllers/UserController');
const City = require('../controllers/CityController');
const Event = require('../controllers/EventController');
const Place = require('../controllers/PlaceController');

router.use('/users',Users);
router.use('/cities',City);
router.use('/places',Place);
router.use('/events',Event);

module.exports = router;
