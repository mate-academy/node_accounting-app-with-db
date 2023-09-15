'use strict';

const express = require('express');
const userController = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', userController.getAll);
usersRouter.get('/:userId', userController.getOne);
usersRouter.post('/', userController.add);
usersRouter.delete('/:userId', userController.remove);
usersRouter.patch('/:userId', userController.update);

module.exports = { usersRouter };
