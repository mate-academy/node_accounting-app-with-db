const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/', usersController.create);

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:id', usersController.get);

usersRouter.patch('/:id', usersController.patch);

usersRouter.delete('/:id', usersController.remove);

module.exports = { usersRouter };
