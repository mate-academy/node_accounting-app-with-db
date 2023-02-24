'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/users', userController.getAll);

router.post('/users', express.json(), userController.create);

router.get('/users/:userId', userController.findById);

router.delete('/users/:userId', userController.remove);

router.patch('/users/:userId', express.json(), userController.change);

module.exports.userRouter = router;
