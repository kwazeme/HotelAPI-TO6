const express = require("express");
const routes = express.Router();

const indexcontroller = require("../controller/user");

routes.get("/", indexcontroller.usersGet);
routes.get("/:id", indexcontroller.userGet);
routes.post("/", indexcontroller.userPost);
routes.put("/:id", indexcontroller.userPut);
routes.delete("/:id", indexcontroller.userDelete);

module.exports = routes;