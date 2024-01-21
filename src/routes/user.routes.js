'use strict';

const express = require('express');
const userController = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.get('/users', userController.getAll);
userRouter.get('/users/:id', userController.getById);
userRouter.post('/users', userController.create);
userRouter.delete('/users/:id', userController.remove);
userRouter.patch('/users/:id', userController.patch);

module.exports = { userRouter };
