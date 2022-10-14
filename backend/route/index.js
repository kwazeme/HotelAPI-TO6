const express = require("express");
const router = express.Router();

const indexcontroller = require("../controller/index");

router.use("/user", require("./user"));
module.exports = router;


