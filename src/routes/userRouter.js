'use strict';

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = { userRouter: router };
