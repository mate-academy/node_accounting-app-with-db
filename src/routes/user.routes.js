'use strict';

const express = require('express');
const controller = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', controller.get);

usersRouter.post('/', controller.post);

usersRouter.get('/:id', controller.getUser);

usersRouter.delete('/:id', controller.removeUser);

usersRouter.patch('/:id', controller.updateUser);

module.exports = { usersRouter };
