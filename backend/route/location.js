const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");

const indexcontroller = require("../controller/location");

router.get("/", indexcontroller.locationsGet);

router.get("/:id", indexcontroller.locationGet);

router.post("/", validation.saveLocation, indexcontroller.locationPost);

router.put("/:id", validation.saveLocation, indexcontroller.locationPut);

router.delete("/:id", indexcontroller.locationDelete);

module.exports = router;
