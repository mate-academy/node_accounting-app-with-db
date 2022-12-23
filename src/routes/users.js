'use strict';

const express = require('express');
const usersRouter = express.Router();

const usersController = require('../controllers/users');

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.delete('/:userId', usersController.removeUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = { usersRouter };
