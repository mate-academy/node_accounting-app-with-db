'use strict';

const express = require('express');
const usersControllers = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersControllers.getAll);
usersRouter.get('/:userId', usersControllers.getOne);
usersRouter.post('/', usersControllers.create);
usersRouter.delete('/:userId', usersControllers.remove);
usersRouter.patch('/:userId', usersControllers.update);

module.exports = usersRouter;
