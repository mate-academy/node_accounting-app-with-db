'use strict';

const userController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', express.json(), userController.getAll);

router.post('/', express.json(), userController.add);

router.get('/:userId', userController.getOne);

router.delete('/:userId', userController.remove);

router.patch('/:userId', express.json(), userController.update);

module.exports = { router };
