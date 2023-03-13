'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getOne);
router.post('/', userController.addUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = { router };
