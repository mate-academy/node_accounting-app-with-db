'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/', userController.add);

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.patch('/:id', userController.change);

router.delete('/:id', userController.remove);

module.exports = { router };
