const express = require("express");
const controller = require("../controllers");
const routes = express.Router();

routes.route("/").post(controller.getUser);

module.exports = routes;