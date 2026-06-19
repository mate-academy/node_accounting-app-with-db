const express = require('express');
const userController = require('../controllers/user.controler');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getOneUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.patch('/:id', userController.updateUser);

module.exports = {
  userRouter,
};
