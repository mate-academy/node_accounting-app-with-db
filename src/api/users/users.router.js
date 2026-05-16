const { Router } = require('express');
const { usersController } = require('./users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', usersController.getById);

usersRouter.delete('/:id', usersController.remove);

usersRouter.patch('/:id', usersController.update);

module.exports = {
  usersRouter,
};
