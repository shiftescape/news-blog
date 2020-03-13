const express = require('express');
const controller = require('../controllers');
const routes = express.Router();

routes.route('/').get(controller.getNews);
routes.route('/').post(controller.createNews);

module.exports = routes;