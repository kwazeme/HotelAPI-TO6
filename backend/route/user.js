const express = require("express");
const routes = express.Router();
const validation = require("../middleware/validate");


const indexcontroller = require("../controller/user");

routes.get("/", indexcontroller.usersGet);
routes.get("/:id", indexcontroller.userGet);
routes.post("/", validation.saveUser, indexcontroller.userPost);
routes.put("/:id", validation.saveUser, indexcontroller.userPut);
routes.delete("/:id", indexcontroller.userDelete);

module.exports = routes;