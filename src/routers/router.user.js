'use strict';

const express = require('express');
const { userController } = require('../controllers/controller.user');
const { middlewareCheckIdAsInteger } = require('../servise/middlewareCheckIdAsInteger');

const routerUsers = express.Router();

routerUsers.get('/', userController.getAll);
routerUsers.post('/', userController.postById);
routerUsers.get('/:id', userController.getById);
routerUsers.patch('/:id', userController.patchById);
routerUsers.delete('/:id', userController.deleteById);

routerUsers.param('id', middlewareCheckIdAsInteger);

module.exports = {
  routerUsers,
};
