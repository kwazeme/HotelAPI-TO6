const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");

const indexcontroller = require("../controller/staff");

router.get("/", indexcontroller.staffsGet);

router.get("/:id", indexcontroller.staffGet);

router.post("/", validation.saveStaff, indexcontroller.staffPost);

router.put("/:id", validation.saveStaff, indexcontroller.staffPut);

router.delete("/:id", indexcontroller.staffDelete);

module.exports = router;
