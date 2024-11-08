const express = require('express');

const userRouter = express.Router();

const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('./usersController');

const service = require('./usersServices');

userRouter.get('/', getAllUsers);
userRouter.post('/', service.validateNewUser, addUser);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);
userRouter.patch('/:id', updateUser);

module.exports = { userRouter };
