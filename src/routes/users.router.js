const { Router } = require('express');
const usersController = require('../controllers/users.controller.js');

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.patch('/:userId', usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);

module.exports = usersRouter;
