'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:userId', userController.getById);

router.post('/', express.json(), userController.add);

router.patch('/:userId', express.json(), userController.update);

router.delete('/:userId', userController.remove);

module.exports = { router };
