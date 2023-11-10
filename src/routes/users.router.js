'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const usersRouter = express.Router();

usersRouter.get('/', userController.get);
usersRouter.post('/', userController.addUser);
usersRouter.get('/:id', userController.getOne);
usersRouter.delete('/:id', userController.remove);
usersRouter.patch('/:id', userController.update);

module.exports = usersRouter;
