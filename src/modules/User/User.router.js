'use strict';

const { json } = require('express');
const Router = require('../../utils/Router');
const userController = require('./User.provider');

const userRouter = new Router(userController, json(), [
  { method: 'get', path: '/', handler: userController.getAll },
  { method: 'post', path: '/', handler: userController.add },
  { method: 'get', path: '/:id', handler: userController.getOne },
  { method: 'delete', path: '/:id', handler: userController.remove },
  { method: 'patch', path: '/:id', handler: userController.update },
]);

module.exports = userRouter.router;
