'use strict';

const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');

userRouter.get('/', userController.getUsers);

userRouter.get('/:id', userController.getUser);

userRouter.post('/', userController.createUser);

userRouter.delete('/:id', userController.deleteUser);

userRouter.patch('/:id', userController.updateUser);

module.exports = {
  userRouter,
};
