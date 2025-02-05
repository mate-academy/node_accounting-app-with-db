const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controllers/users.controller');

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:id', usersController.getUserById);

usersRouter.post('/', usersController.createUser);

usersRouter.delete('/:id', usersController.deleteUser);

usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  usersRouter,
};
