'use strict';

const express = require('express');

const usersRouter = express.Router();

const userControlers = require('../controllers/users');

usersRouter.get('/', userControlers.getAll);

usersRouter.get('/:userId', userControlers.getOne);

usersRouter.post('/', express.json(), userControlers.add);

usersRouter.delete('/:userId', userControlers.remove);

usersRouter.patch('/:userId', express.json(), userControlers.update);

module.exports = usersRouter;
