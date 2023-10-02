'use strict';

const express = require('express');
const usersRouter = express.Router();
const userControllers = require('../controllers/users.controller');

usersRouter.get('/', userControllers.get);
usersRouter.get('/:id', userControllers.getOne);
usersRouter.post('/', userControllers.create);
usersRouter.patch('/:id', userControllers.update);
usersRouter.delete('/:id', userControllers.remove);

module.exports = { usersRouter };
