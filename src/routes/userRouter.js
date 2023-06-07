'use strict';

const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userController.getUserById);

userRouter.post('/', userController.create);

userRouter.delete('/:userId', userController.remove);

userRouter.patch('/:userId', userController.update);

module.exports = {
  userRouter,
};
