'use strict';

const express = require('express');

const usersController = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', usersController.getOne);

usersRouter.delete('/:id', usersController.remove);

usersRouter.patch('/:id', usersController.update);

module.exports = {
  usersRouter,
};
