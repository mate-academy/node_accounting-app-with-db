const express = require('express');
const userController = require('./../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', userController.getUsers);

userRouter.post('/', userController.createUser);

userRouter.get('/:id', userController.getOneUser);

userRouter.delete('/:id', userController.removeUser);

userRouter.patch('/:id', userController.updateUser);

module.exports = { userRouter };
