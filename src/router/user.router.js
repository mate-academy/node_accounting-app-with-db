const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.delete('/:id', usersController.removeUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  usersRouter,
};
