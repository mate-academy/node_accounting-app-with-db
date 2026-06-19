const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:id', usersController.getUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = { usersRouter };
