const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router.get('/', userController.get);

router.post('/', userController.create);

router.get('/:id', userController.getOne);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = { router };
