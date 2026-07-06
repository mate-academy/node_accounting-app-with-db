'use strict';

const { Router } = require('express');

const {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUserById);
usersRouter.delete('/:id', deleteUser);
usersRouter.patch('/:id', updateUser);

module.exports = {
  usersRouter,
};
