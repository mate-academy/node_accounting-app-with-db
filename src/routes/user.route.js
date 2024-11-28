const express = require('express');

const usersRoute = express.Router();

const userController = require('../controller/user.controller');

usersRoute.get('/', userController.getUsers);

usersRoute.get('/:id', userController.getUserById);

usersRoute.post('/', userController.createUser);

usersRoute.patch('/:id', userController.updateUser);

usersRoute.delete('/:id', userController.deleteUserById);

module.exports = { usersRoute };
