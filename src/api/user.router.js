const { Router } = require('express');
const { userController } = require('./user.controller.js');

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUserById);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = {
  userRouter,
};
