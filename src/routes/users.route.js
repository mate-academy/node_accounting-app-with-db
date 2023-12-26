'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.delete('/:id', userController.remove);

router.post('/', express.json(), userController.create);

router.patch('/:id', express.json(), userController.update);

module.exports = router;
