const { Router } = require('express');
const userController = require('../controllers/users.controller.js');

const usersRouter = Router();

usersRouter.get('/', userController.getAll);
usersRouter.get('/:id', userController.getOne);
usersRouter.post('/', userController.create);
usersRouter.delete('/:id', userController.remove);
usersRouter.patch('/:id', userController.update);
usersRouter.put('/:id', userController.update);

module.exports = {
  usersRouter,
};
