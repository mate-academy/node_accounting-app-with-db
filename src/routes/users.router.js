const express = require('express');

const usersRouter = express.Router();

const {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', createUser);

usersRouter.patch('/:id', updateUser);

usersRouter.delete('/:id', removeUser);

module.exports = { usersRouter };
