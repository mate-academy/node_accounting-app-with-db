const usersController = require('../controller/users.controller');

const Router = require('express').Router;

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  usersRouter,
};
