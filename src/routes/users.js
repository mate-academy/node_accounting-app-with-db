'use strict';

const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/users.js');

usersRouter.get('/', userController.getAll);

usersRouter.get('/:userId', userController.getOne);

usersRouter.post('/', userController.add);

usersRouter.patch('/:userId', userController.update);

usersRouter.delete('/:userId', userController.remove);

module.exports = { usersRouter };
