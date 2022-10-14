const express = require("express");
const router = express.Router();

const indexcontroller = require("../controller/index");

router.use("/user", require("./user"));
router.use("/staff", require("./staff"));
router.use("/reservation", require("./reservation"));
router.use("/location", require("./location"));

module.exports = router;


