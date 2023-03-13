'use strict';

const express = require('express');
const usersControllers = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', usersControllers.getAll);
usersRouter.get('/:userId', usersControllers.getOne);
usersRouter.post('/', usersControllers.addNewUser);
usersRouter.delete('/:userId', usersControllers.deleteUser);
usersRouter.patch('/:userId', usersControllers.updateUserInfo);

module.exports = usersRouter;
