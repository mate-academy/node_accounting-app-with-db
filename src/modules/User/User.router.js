'use strict';

const express = require('express');
const UserRouter = express.Router();
const { UserController } = require('./User.controller');

UserRouter.get('/', UserController.getAll);
UserRouter.get('/:id', UserController.getById);
UserRouter.post('/', UserController.create);
UserRouter.patch('/:id', UserController.update);
UserRouter.delete('/:id', UserController.delete);

module.exports = { UserRouter };
