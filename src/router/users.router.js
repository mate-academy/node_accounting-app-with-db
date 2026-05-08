const express = require('express');
const route = express.Router();
const controllerUser = require('./../controller/user.controller.js');

route.get('/', controllerUser.getAllUsers);
route.get('/:id', controllerUser.getUserById);
route.post('/', controllerUser.createUser);
route.delete('/:id', controllerUser.deleteUser);
route.patch('/:id', controllerUser.updateUser);

module.exports = route;
