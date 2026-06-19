'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:id', usersController.getOneUser);
usersRouter.patch('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.removeUser);

module.exports = usersRouter;
