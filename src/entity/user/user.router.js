const express = require('express');
const {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('./user.controller');
const usersRouter = express.Router();

usersRouter.get('/', getAll);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUserById);
usersRouter.delete('/:id', deleteUser);
usersRouter.patch('/:id', updateUser);

module.exports = usersRouter;
