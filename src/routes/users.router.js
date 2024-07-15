const express = require('express');
const { UserService } = require('./../services');
const { UsersController } = require('./../controllers');

const usersRouter = express.Router();
const controller = new UsersController(UserService);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/', controller.create.bind(controller));
usersRouter.get('/:id', controller.getOne.bind(controller));
usersRouter.patch('/:id', controller.update.bind(controller));
usersRouter.delete('/:id', controller.deleteOne.bind(controller));

module.exports = usersRouter;
