const express = require('express');
const userController = require('../controllers/users.controller.js');
const usersRouter = express.Router();

usersRouter.get('/', userController.getAllUsers);

usersRouter.get('/:id', userController.getOneUser);

usersRouter.post('/', userController.createNewUser);

usersRouter.patch('/:id', userController.updateUser);

usersRouter.delete('/:id', userController.deleteUser);

module.exports = { usersRouter };
