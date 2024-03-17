'use strict';

const express = require('express');
const userController = require('./../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get('/:id', userController.getById);

userRouter.post('/', userController.create);

userRouter.patch('/:id', userController.update);

userRouter.delete('/:id', userController.remove);

module.exports = { userRouter };
