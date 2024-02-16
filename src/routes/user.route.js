'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.post('/', express.json(), userController.addOne);

router.delete('/:id', userController.deleteOne);

router.patch('/:id', express.json(), userController.updateOne);

module.exports = router;
