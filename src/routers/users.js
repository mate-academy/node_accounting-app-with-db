'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:userId', usersController.removeUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = { usersRouter };
