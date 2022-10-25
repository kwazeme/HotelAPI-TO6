const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");

const indexcontroller = require("../controller/reservation");

router.get("/", indexcontroller.reservationsGet);

router.get("/:id", indexcontroller.reservationGet);

router.post("/", validation.saveReservation, indexcontroller.reservationPost);

router.put("/:id", validation.saveReservation, indexcontroller.reservationPut);

router.delete("/:id", indexcontroller.reservationDelete);

module.exports = router;
