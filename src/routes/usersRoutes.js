'use strict';

const express = require('express');
const usersRouter = express.Router();

const usersController = require('../controllers/usersController');

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOne);

usersRouter.post('/', usersController.create);

usersRouter.delete('/:userId', usersController.remove);

usersRouter.patch('/:userId', usersController.update);

module.exports = usersRouter;
