'use strict';

const express = require('express');
const userController = require('../controllers/users');

const routerUser = express.Router();

routerUser.get('/', userController.getAll);

routerUser.get('/:userId', userController.getOne);

routerUser.post('/', userController.add);

routerUser.delete('/:userId', userController.remove);

routerUser.patch('/:userId', userController.update);

module.exports = { routerUser };
