'use strict';

const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.delete('/:id', removeUser);
usersRouter.patch('/:id', updateUser);

module.exports = { usersRouter };
