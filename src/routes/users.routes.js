'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const usersRouter = express.Router();

usersRouter.get('/', userController.get);
usersRouter.get('/:id', userController.getOne);
usersRouter.post('/', userController.create);
usersRouter.delete('/:id', userController.remove);
usersRouter.patch('/:id', userController.update);

module.exports = usersRouter;
