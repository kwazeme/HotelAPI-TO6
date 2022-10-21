//const express = require("express");
const router = require('express').Router();
//const router = express.Router();

const auth = require('../middleware/swaggerAuth');
const user = require('./user');

// const indexcontroller = require("../controller/index");

router.use("/user", auth, require("./user"));
router.use("/staff", auth, require("./staff"));
router.use("/reservation", auth, require("./reservation"));
router.use("/location", auth, require("./location"));
router.use('/', require('./swagger'));

//Joseph Garner: 10-17-22---------------------------------
    //router.use('/users', auth, user);
    //router.use('/users', auth, user);
    router.use('/login', require('./auth'));
//--------------------------------------------------------

module.exports = router;