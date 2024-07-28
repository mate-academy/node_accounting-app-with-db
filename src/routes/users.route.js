const express = require('express');
const usersController = require('./../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getOne);
usersRouter.post('/', usersController.create);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.remove);

module.exports = {
  usersRouter,
};
