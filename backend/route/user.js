const express = require("express");
const router = express.Router();

const indexcontroller = require("../controller/index");

router.get("/", indexcontroller.usersGet);

router.get("/:id", indexcontroller.userGet);

router.post("/", indexcontroller.userPost);

router.put("/:id", indexcontroller.userPut);

router.delete("/:id", indexcontroller.userDelete);

module.exports = router;
