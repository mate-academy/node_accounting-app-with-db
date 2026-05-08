const express = require('express');
const { usersController } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/:id', usersController.get);
usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.delete('/:id', usersController.remove);
usersRouter.patch('/:id', usersController.update);

module.exports = usersRouter;
