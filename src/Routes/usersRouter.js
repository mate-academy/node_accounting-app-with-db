const { Router } = require('express');
const userController = require('../Controllers/userController');

const usersRouter = Router();

usersRouter.get('/', userController.getAll);
usersRouter.post('/', userController.create);
usersRouter.get('/:id', userController.getById);
usersRouter.delete('/:id', userController.delete);
usersRouter.patch('/:id', userController.update);

module.exports = usersRouter;
