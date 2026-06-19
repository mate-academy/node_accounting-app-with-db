const express = require('express');
const usersController = require('../controllers/users.controller');
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.getById);
usersRouter.delete('/:id', usersController.deleteById);
usersRouter.patch('/:id', usersController.update);

module.exports = usersRouter;
