const express = require('express');
const controller = require('../controllers');
const routes = express.Router();

routes.route('/:id').get(controller.getUser);
routes.route('/:username/news').get(controller.getNewsByUserName);
routes.route('/').post(controller.createUser);

module.exports = routes;