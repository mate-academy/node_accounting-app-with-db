const express = require('express');
const userController = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
