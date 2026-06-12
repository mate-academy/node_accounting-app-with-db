const { Router } = require('express');

const usersController = require('../controllers/users.controllers');

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  usersRouter,
};
