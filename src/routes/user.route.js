'use strict';

const express = require('express');
const userController = require('./../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getOne);
userRouter.post('/', userController.post);
userRouter.patch('/:id', userController.patch);
userRouter.delete('/:id', userController.delete);

module.exports = userRouter;
