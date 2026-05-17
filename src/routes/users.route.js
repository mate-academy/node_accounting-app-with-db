const express = require('express');
const userController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', userController.getAllUsers);

usersRouter.get('/:id', userController.getOneUser);

usersRouter.delete('/:id', userController.removeUser);

usersRouter.patch('/:id', userController.updateUser);

usersRouter.post('/', userController.addUser);

module.exports = { usersRouter };
