'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.addUser);
router.patch('/:id', userController.editUser);
router.delete('/:id', userController.delUser);

module.exports = router;
