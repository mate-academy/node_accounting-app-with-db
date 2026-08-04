const express = require('express');
const userController = require('../controllers/user.controller');

const route = express.Router();

route.get('/', userController.getAll);
route.post('/', userController.create);

route.get('/:id', userController.getById);
route.delete('/:id', userController.remove);
route.patch('/:id', userController.update);

module.exports = route;
