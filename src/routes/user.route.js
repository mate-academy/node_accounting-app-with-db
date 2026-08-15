'use strict';

const express = require('express');
const createUserController = require('../controllers/user.controller.js');

function createUserRouter(userService) {
  const userRouter = express.Router();
  const userController = createUserController(userService);

  userRouter.get('/users', userController.getUsers);
  userRouter.get('/users/:id', userController.getUserById);
  userRouter.post('/users', userController.createUser);
  userRouter.delete('/users/:id', userController.removeUser);
  userRouter.patch('/users/:id', userController.updateUser);

  return userRouter;
}

module.exports = createUserRouter;
