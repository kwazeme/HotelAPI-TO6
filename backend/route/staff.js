const express = require("express");
const router = express.Router();

const indexcontroller = require("../controller/staff");

router.get("/", indexcontroller.staffsGet);

router.get("/:id", indexcontroller.staffGet);

router.post("/", indexcontroller.staffPost);

router.put("/:id", indexcontroller.staffPut);

router.delete("/:id", indexcontroller.staffDelete);

module.exports = router;
