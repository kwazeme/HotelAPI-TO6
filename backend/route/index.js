//const express = require("express");
const router = require('express').Router();
//const router = express.Router();

const {auth} = require('../middleware/swaggerAuth');
const user = require('./user');

// const indexcontroller = require("../controller/index");

router.use("/user", require("./user"));
router.use("/staff", require("./staff"));
router.use("/reservation", require("./reservation"));
router.use("/location", require("./location"));
router.use('/', require('./swagger'));

//Joseph Garner: 10-17-22---------------------------------
    router.use('/users', auth, user);
    router.use('/login', require('./auth'));
//--------------------------------------------------------

module.exports = router;