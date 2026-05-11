const express = require('express');
const { usersController } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:id', usersController.getUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = { usersRouter };
