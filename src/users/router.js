const { Router } = require('express');
const express = require('express');
const UsersController = require('./controller');

const usersRouter = Router();

usersRouter.get('/users', UsersController.getAllUsers);
usersRouter.get('/users/:id', UsersController.getOneUser);
usersRouter.post('/users', express.json(), UsersController.createUser);
usersRouter.delete('/users/:id', UsersController.removeUser);
usersRouter.patch('/users/:id', express.json(), UsersController.updateUser);

module.exports = usersRouter;
