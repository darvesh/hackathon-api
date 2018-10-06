const express = require('express');
const router = express.Router();

const Users = require('../controllers/UserController');

router.use('/users', Users);

module.exports = router;
