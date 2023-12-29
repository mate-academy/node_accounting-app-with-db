'use strict';

const express = require('express');
const cors = require('cors');
const {
  getUsers,
  getUserById,
  addNewUser,
  changeUser,
  removeUser,
} = require('../controllers/usersControllers');

const usersRouter = express.Router();

usersRouter.get('/', cors(), getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', addNewUser);

usersRouter.put('/:id', changeUser);

usersRouter.delete('/:id', removeUser);

module.exports = {
  usersRouter,
};
