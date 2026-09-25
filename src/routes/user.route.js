const express = require('express');

const { usersController } = require('../controllers/user.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUser);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  usersRouter,
};
