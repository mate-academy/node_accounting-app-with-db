const express = require('express');

const { userController } = require('../controllers/users.controller');

function createUserRouter() {
  const userRouter = express.Router();

  userRouter.get('/', userController.getAll);
  userRouter.get('/:id', userController.getById);
  userRouter.post('/', userController.create);
  userRouter.delete('/:id', userController.deleteById);
  userRouter.patch('/:id', userController.upDate);

  return userRouter;
}

module.exports = {
  createUserRouter,
};
