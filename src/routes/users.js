'use strict';

const express = require('express');
const usersController = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:userId', usersController.getOne);

usersRouter.post('/', usersController.create);

usersRouter.delete('/:userId', usersController.remove);

usersRouter.patch('/:userId', usersController.update);

module.exports = { usersRouter };
