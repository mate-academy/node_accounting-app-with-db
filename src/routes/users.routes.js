const express = require('express');

const userController = require('../controllers/users.controller.js');
const { User } = require('../models/User.model.js');

module.exports = function (users) {
  const usersRouter = express.Router();

  usersRouter.get('/', userController.getAllUsers(User));
  usersRouter.post('/', userController.postUsers(User));
  usersRouter.get('/:id', userController.getUserById(User));
  usersRouter.delete('/:id', userController.deleteUser(User));
  usersRouter.patch('/:id', userController.patchUsers(User));

  return usersRouter;
};
