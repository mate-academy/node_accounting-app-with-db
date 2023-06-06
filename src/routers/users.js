'use strict';

const express = require('express');
const userController = require('../controllers/users.js');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getById);

router.post('/', userController.addUser);
router.patch('/:userId', userController.update);
router.delete('/:userId', userController.remove);

module.exports = { router };
