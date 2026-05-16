const express = require('express');
const userController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', userController.getAllUsers);
usersRouter.post('/', userController.createUser);
usersRouter.get('/:id', userController.getUser);
usersRouter.delete('/:id', userController.deleteUser);
usersRouter.patch('/:id', userController.updateUser);

module.exports = {
  usersRouter,
};
