const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.getById);
usersRouter.delete('/:id', usersController.deleteById);
usersRouter.patch('/:id', usersController.updateById);

module.exports = { usersRouter };
