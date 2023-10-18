'use strict';

const express = require('express');
const userController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', userController.getAll);

usersRouter.post('/', userController.create);

usersRouter.get('/:id', userController.getById);

usersRouter.delete('/:id', userController.remove);

usersRouter.patch('/:id', userController.update);

module.exports = {
  usersRouter,
};
