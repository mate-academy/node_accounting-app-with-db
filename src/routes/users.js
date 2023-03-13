'use strict';

const express = require('express');
const userController = require('../controllers/users');

const routerUsers = express.Router();

routerUsers.get('/', userController.getAllUsers);
routerUsers.get('/:userId', userController.getOneUser);
routerUsers.post('/', express.json(), userController.addUser);
routerUsers.delete('/:userId', userController.removeUser);
routerUsers.patch('/:userId', express.json(), userController.updateUser);

module.exports = {
  routerUsers,
};
