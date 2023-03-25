'use strict';

const express = require('express');
const usersController = require('../users/users.controller');

const usersRouter = express.Router();

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.delete('/:id', usersController.remove);
usersRouter.patch('/:id', usersController.update);

module.exports = usersRouter;
