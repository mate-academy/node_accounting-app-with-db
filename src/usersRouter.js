const express = require('express');
const usersRouter = express.Router();
const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('./usersController');

const service = require('./usersServices');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', service.validateNewUser, addUser);
usersRouter.get('/:id', getUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.patch('/:id', updateUser);

module.exports = {
  usersRouter,
};
