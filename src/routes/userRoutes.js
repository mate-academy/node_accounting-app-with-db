'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const { validateName } = require('../validators/validateName');

const router = express.Router();

router.post('/', validateName, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.patch('/:id', validateName, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
