'use strict';

const express = require('express');
const userController = require('../controllers/users.js');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:userId', userController.getOne);

router.post('/', userController.add);

router.patch('/:userId', userController.update);

router.delete('/:userId', userController.remove);

module.exports = { router };
