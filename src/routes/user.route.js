'use strict';

const express = require('express');

const { userController } = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getOne);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.update);

module.exports = {
  userRouter,
};
