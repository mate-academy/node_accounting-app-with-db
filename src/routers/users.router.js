const { Router } = require('express');
const usersControllers = require('./../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersControllers.getAll);

usersRouter.get('/:id', usersControllers.getById);

usersRouter.post('/', usersControllers.create);

usersRouter.patch('/:id', usersControllers.update);

usersRouter.delete('/:id', usersControllers.deleteById);

module.exports = {
  usersRouter,
};
