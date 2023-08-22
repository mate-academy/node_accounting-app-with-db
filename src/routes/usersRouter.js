'use strict';

const express = require('express');
const usersController = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.post('/', usersController.addUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = { usersRouter };
