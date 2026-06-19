'use strict';

const express = require('express');
const userController = require('../controllers/user.controllers');
const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getOneUser);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.removeUser);

module.exports = { userRouter };
