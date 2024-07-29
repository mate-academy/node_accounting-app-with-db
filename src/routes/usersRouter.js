const { Router } = require('express');
const usersController = require('../controllers/usersController.js');

const usersRouter = Router();

usersRouter.get('/', usersController.listAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:id', usersController.getUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = { usersRouter };
