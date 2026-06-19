const { usersController } = require('../controllers/users.controller');

const { Router } = require('express');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:id', usersController.getUser);

usersRouter.post('/', usersController.createUser);

usersRouter.patch('/:id', usersController.updateUser);

usersRouter.delete('/:id', usersController.deleteUser);

module.exports = {
  usersRouter,
};
