const usersController = require('../controllers/users.controller');
const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);

usersRouter.get('/:id', usersController.getOneUser);

usersRouter.post('/', usersController.createNewUser);

usersRouter.delete('/:id', usersController.deleteUser);

usersRouter.patch('/:id', usersController.updateUser);

module.exports = usersRouter;
