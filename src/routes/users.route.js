const express = require('express');
const usersController = require('../controllers/users.controller');
const validationMiddleware = require('../middleware/validationMiddleware');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.post(
  '/',
  validationMiddleware.validateUserInput,
  usersController.createUser,
);

usersRouter.get(
  '/:id',
  validationMiddleware.validateId,
  usersController.getUserById,
);

usersRouter.delete(
  '/:id',
  validationMiddleware.validateId,
  usersController.removeUser,
);

usersRouter.patch(
  '/:id',
  validationMiddleware.validateId,
  usersController.updateUser,
);

module.exports = {
  usersRouter,
};
