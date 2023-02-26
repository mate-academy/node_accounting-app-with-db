'use strict';

const express = require('express');
const usersController = require('../controllers/users');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:userId', usersController.findById);

usersRouter.post('/', express.json(), usersController.create);

usersRouter.patch('/:userId', express.json(), usersController.update);

usersRouter.delete('/:userId', usersController.remove);

module.exports = usersRouter;
