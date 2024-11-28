const { Router } = require('express');

const usersControllers = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersControllers.getUsers);

usersRouter.get('/:id', usersControllers.getUser);

usersRouter.post('/', usersControllers.createUser);

usersRouter.put('/:id', usersControllers.updateUser);

usersRouter.patch('/:id', usersControllers.updateUser);

usersRouter.delete('/:id', usersControllers.removeUser);

module.exports = { usersRouter };
