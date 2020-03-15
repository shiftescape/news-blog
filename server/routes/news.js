const express = require('express');
const controller = require('../controllers');
const routes = express.Router();

routes.route('/').get(controller.getNews);
routes.route('/:id').get(controller.getNewsByID);
routes.route('/:id').put(controller.updateNewsByID);
routes.route('/').post(controller.createNews);
routes.route('/:id').delete(controller.deleteNews);

module.exports = routes;