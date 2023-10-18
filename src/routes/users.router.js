'use strict';

const express = require('express');
const controller = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', controller.getAllUsers);

usersRouter.get('/:id', controller.getUser);

usersRouter.post('/', controller.post);

usersRouter.delete('/:id', controller.removeUser);

usersRouter.patch('/:id', controller.updateUser);

module.exports = usersRouter;
