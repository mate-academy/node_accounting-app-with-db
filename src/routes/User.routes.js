const express = require('express');
const usersController = require('../controllers/User.controller.js');
const usersRouter = express.Router();

usersRouter.get('/', usersController.get);
usersRouter.get('/:id', usersController.getOne);
usersRouter.post('/', usersController.create);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.remove);

module.exports = usersRouter;
