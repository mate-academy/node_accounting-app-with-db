const express = require('express');

const userController = require('../controllers/users.controller.js');

module.exports = function () {
  const usersRouter = express.Router();

  usersRouter.get('/', userController.getAll);
  usersRouter.get('/:id', userController.getById);
  usersRouter.post('/', userController.addUser);
  usersRouter.delete('/:id', userController.deleteUser);
  usersRouter.patch('/:id', userController.updateUser);

  return usersRouter;
};
