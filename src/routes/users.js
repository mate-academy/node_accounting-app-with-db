'use strict';

const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.get('/users', userController.getAll);

router.get('/users/:userId', userController.getOne);

router.post('/users', userController.add);

router.delete('/users/:userId', userController.remove);

router.patch('/users/:userId', userController.update);

module.exports = { usersRouter: router };
