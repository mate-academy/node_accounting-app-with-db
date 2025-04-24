'use strict';

const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.getOne);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.remove);

module.exports = { usersRouter };
