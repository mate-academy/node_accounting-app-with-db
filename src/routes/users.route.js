const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createNewUser);
usersRouter.patch('/:id', usersController.updateUserById);
usersRouter.delete('/:id', usersController.deleteUserById);

module.exports = {
  usersRouter,
};
