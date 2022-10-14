const express = require("express");
const router = express.Router();

const indexcontroller = require("../controller/index");

router.get("/", indexcontroller.reservationsGet);

router.get("/:id", indexcontroller.reservationGet);

router.post("/", indexcontroller.reservationPost);

router.put("/:id", indexcontroller.reservationPut);

router.delete("/:id", indexcontroller.reservationDelete);

module.exports = router;
