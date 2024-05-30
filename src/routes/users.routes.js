const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users.controllers.js');

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:id', usersController.getUserById);

usersRouter.post('/', usersController.createUser);

usersRouter.delete('/:id', usersController.deleteUser);

usersRouter.patch('/:id', usersController.updateUser);

module.exports = usersRouter;
