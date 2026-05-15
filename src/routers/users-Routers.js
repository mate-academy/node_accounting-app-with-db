const express = require('express');
const { usersController } = require('../controllers/users-Controllers.js');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:userId', usersController.getOne);
usersRouter.delete('/:userId', usersController.deleteOne);
usersRouter.patch('/:userId', usersController.update);

module.exports = {
  usersRouter,
};
