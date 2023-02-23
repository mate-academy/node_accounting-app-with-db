'use strict';

const express = require('express');
const userControllers = require('../controllers/users');
const userRouter = express.Router();

userRouter.get('/', userControllers.getAllUsers);
userRouter.get('/:userId', userControllers.getUserById);
userRouter.post('/', express.json(), userControllers.createUser);
userRouter.delete('/:userId', userControllers.removeUser);
userRouter.patch('/:userId', express.json(), userControllers.updateUser);

module.exports = {
  userRouter,
};
