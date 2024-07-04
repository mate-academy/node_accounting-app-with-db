const express = require('express');

const usersRouter = express.Router();

const userController = require('../controllers/user.contoller');

usersRouter.get('/', userController.getUsers);

usersRouter.get('/:id', userController.getUserById);

usersRouter.post('/', userController.createUser);

usersRouter.patch('/:id', userController.patchUser);

usersRouter.delete('/:id', userController.deleteUser);

module.exports = { usersRouter };
