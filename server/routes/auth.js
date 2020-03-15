const express = require('express');
const controller = require('../controllers');
const routes = express.Router();

routes.route('/login').post(controller.loginUser);

module.exports = routes;