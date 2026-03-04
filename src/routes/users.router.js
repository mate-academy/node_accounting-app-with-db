const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const { asyncHandler } = require('../utils');

const usersRouter = Router();

usersRouter.get('/', asyncHandler(usersController.getAll));
usersRouter.post('/', asyncHandler(usersController.create));
usersRouter.get('/:id', asyncHandler(usersController.getOne));
usersRouter.delete('/:id', asyncHandler(usersController.deleteOne));
usersRouter.patch('/:id', asyncHandler(usersController.update));

module.exports = { usersRouter };
