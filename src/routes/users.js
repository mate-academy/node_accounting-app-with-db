'use strict';

const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  removeUser,
  modifyUser,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', getUser);
usersRouter.delete('/:userId', removeUser);
usersRouter.patch('/:userId', modifyUser);

module.exports = {
  usersRouter,
};
