'use strict';

const express = require('express');
const { initUserController } = require('../controllers/users');

function initUserRouter() {
  const userController = initUserController();

  const userRouter = express.Router();

  userRouter.post('/', userController.addUser);

  userRouter.get('/', userController.getAllUsers);

  userRouter.get('/:id', userController.getUserById);

  userRouter.patch('/:id', userController.updateUserById);

  userRouter.delete('/:id', userController.deleteUserById);

  return {
    userRouter,
    userController,
  };
}

module.exports = { initUserRouter };
