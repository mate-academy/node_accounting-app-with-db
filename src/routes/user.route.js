'use strict';

const express = require('express');

const userRouter = express.Router();

const userController = require('../controllers/user.controller');

userRouter.patch('/:id', userController.update);

userRouter.get('/', userController.getAll);

userRouter.get('/:id', userController.getById);

userRouter.delete('/:id', userController.remove);

userRouter.post('/', userController.create);

module.exports = {
  userRouter,
};
