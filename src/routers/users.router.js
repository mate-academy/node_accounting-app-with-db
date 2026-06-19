const { Router } = require('express');
const { usersController } = require('./../controllers');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getOne);
usersRouter.post('/', usersController.create);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.deleteOne);

module.exports = usersRouter;
