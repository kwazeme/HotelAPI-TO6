const express = require("express");
const router = express.Router();

const indexcontroller = require("../controller/index");

router.get("/", indexcontroller.locationsGet);

router.get("/:id", indexcontroller.locationGet);

router.post("/", indexcontroller.locationPost);

router.put("/:id", indexcontroller.locationPut);

router.delete("/:id", indexcontroller.locationDelete);

module.exports = router;
